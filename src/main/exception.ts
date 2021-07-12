export interface ExceptionSpec<T = {}> {
    name: string;
    message: string;
    status?: number;
    details?: T;
}

export class Exception<T = {}> extends Error {
    name = this.constructor.name;
    status?: number;
    details?: T;

    constructor(message: string, details?: T) {
        super(message);
        this.details = details;
        // By default, Error.message is non-enumerable
        Object.defineProperty(this, 'message', { enumerable: true, value: message });
    }

    static fromJSON<T>(spec: ExceptionSpec<T>): Exception<T> {
        return new (class extends Exception<T> {
            name = spec.name;
            status = spec.status;
        })(spec.message, spec.details);
    }
}
