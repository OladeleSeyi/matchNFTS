export class BadRequestError extends Error {
  errors: string;
  status: number;
  constructor({ meta, name, message, status }: ConstructorInputType) {
    super(message);
    this.name = name;
    this.errors = meta;
    this.status = status;
  }
}

interface ConstructorInputType {
  meta?: string;
  name?: string;
  message?: string;
  status?: number;
}
