export class resourceNotFoundError extends Error {
    constructor() {
        super('Resource not found.');
    }
}