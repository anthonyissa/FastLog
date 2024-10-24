export type InvoiceDetails = {
  paid: boolean;
  status: string;
};

export type Invoice = {
  user: string;
  hash: string;
  request: string;
};
