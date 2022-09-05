import Ajv from "ajv/dist/jtd";
import { BadRequestError } from "./bad_request_error";

export default async function validateAndReturnRequest(
  schema: Record<string, unknown>,
  request: string
): Promise<Record<string, any>> {
  const ajv = new Ajv();
  const parse = ajv.compileParser(schema);

  const data = parse(request);

  if (data === undefined) {
    throw new BadRequestError({
      meta: parse.message,
      message: "Validation Error",
      status: 400,
    });
  } else {
    return data;
  }
}
