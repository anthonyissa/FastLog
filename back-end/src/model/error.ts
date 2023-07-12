export class MissingRequiredFieldsError extends Error {
    constructor(message?: string) {
        super(message || "");
        this.name = "MissingRequiredFieldsError";
    }
}