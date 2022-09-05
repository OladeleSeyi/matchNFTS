export class BadRequestError extends Error {
  errors: any;
  status: Number;
  constructor({ meta, name, message, status }: ConstructorInputType) {
    super(message);
    this.name = name; // this property is defined in parent
    this.errors = meta;
    this.status = status;
  }
}

interface ConstructorInputType {
  meta?: string;
  name?: string;
  message?: string;
  status?: Number;
}
