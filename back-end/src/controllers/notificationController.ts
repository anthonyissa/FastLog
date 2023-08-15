import { Request, Response } from "express";
import { createUserWebhook, deleteUserWebhook, editWebhook, getUserWebhooks, sendTestNotification } from "../services/notifications/notificationService";
import { MissingRequiredFieldsError } from "../model/errors";

export const testNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id) throw new MissingRequiredFieldsError();

        const resp = (await sendTestNotification(req["userId"], id as string)).data;
        res.json(resp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export const getWebhooks = async (req: Request, res: Response) => {
    try {
        const webhooks = await getUserWebhooks(req["userId"]);
        res.json(webhooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export const createWebhook = async (req: Request, res: Response) => {
    try {
        const { url, method, body } = req.body;
        if (!url || !method) throw new MissingRequiredFieldsError();

        await createUserWebhook({
            user: req["userId"],
            url,
            method,
            body,
        });
        res.json(true);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export const deleteWebhook = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        if (!id) throw new MissingRequiredFieldsError();

        await deleteUserWebhook(req["userId"], id as string);
        res.json(true);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export const updateWebhook = async (req: Request, res: Response) => {
    try {
        const { id, url, method, body } = req.body;
        if (!id || !url || !method) throw new MissingRequiredFieldsError();

        await editWebhook({
            id,
            user: req["userId"],
            url,
            method,
            body,
        })
        res.json(true);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}