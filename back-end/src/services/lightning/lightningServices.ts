import supabase from "../../lib/supabase";
import { InvoiceDetails, Invoice } from "../../model/lightning";
import dotenv from "dotenv";
dotenv.config();

const lightningHeaders = {
  accept: "application/json, text/plain, */*",
  "content-type": "application/json",
  "x-api-key": process.env.LNBITS_API_KEY,
};

export const getUserInvoice = async (userId: string): Promise<Invoice> => {
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("user", userId);

  if (data.length === 0) {
    return await makeUserInvoice(1, userId);
  }

  return data[0] as Invoice;
};

export const makeUserInvoice = async (
  sats: number,
  userId: string
): Promise<Invoice> => {
  const userHasInvoice = await doesUserHaveInvoice(userId);

  if (userHasInvoice) {
    throw new Error("User already has an invoice");
  }

  const raw = JSON.stringify({
    out: false,
    amount: sats,
    memo: ".",
    lnurl_callback: null,
    unit: "sat",
  });

  const requestOptions = {
    method: "POST",
    headers: lightningHeaders,
    body: raw,
  };

  const res = await fetch(
    "https://demo.lnbits.com/api/v1/payments",
    requestOptions
  );
  const data = await res.json();
  const invoice: Invoice = {
    user: userId,
    hash: data.payment_hash,
    request: data.payment_request,
  };

  const { error } = await supabase.from("invoices").insert(invoice);

  if (error) {
    throw error;
  }

  return invoice;
};

export const checkUserInvoice = async (
  hash: string
): Promise<InvoiceDetails> => {
  const requestOptions = {
    method: "GET",
    headers: lightningHeaders,
  };

  const res = await fetch(
    `https://demo.lnbits.com/api/v1/payments/${hash}`,
    requestOptions
  );
  const data = (await res.json()) as InvoiceDetails;

  return data;
};

export const doesUserHaveInvoice = async (userId: string): Promise<boolean> => {
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("user", userId);

  return data.length > 0;
};

export const didUserPay = async (userId: number): Promise<boolean> => {
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("user", userId);

  if (data.length === 0) {
    return false;
  }

  const invoice = data[0] as Invoice;
  const invoiceDetails = await checkUserInvoice(invoice.hash);

  return invoiceDetails.paid;
};
