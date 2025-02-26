

export class DataError extends Error {
    constructor(message = "Запись не найдена") {
        super(message);
        this.name = "DataError"
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

export class SessionError extends Error {
    constructor(message) {
        super(message);
        this.name = "SessionError";
    }
}