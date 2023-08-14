export class MissingRequiredFieldsError extends Error {
    constructor(message?: string) {
        super(message || "");
        this.name = "MissingRequiredFieldsError";
    }
}

export class InvalidWebhookMethodError extends Error {
    constructor(message: string = "Invalid webhook method. Valid methods are GET and POST") {
        super(message);
        this.name = "InvalidWebhookMethodError";
    }
}