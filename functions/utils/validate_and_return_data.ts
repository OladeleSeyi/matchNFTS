// let { default: Ajv } = await import("ajv/dist/jtd");
// import Ajv, {JTDDataType, JSONSchema} from "ajv/dist/jtd"
import Ajv, { JTDSchemaType } from "ajv/dist/jtd";
import { BadRequestError } from "./bad_request_error";

export async function validateAndReturnRequest(
  schema: Record<string, unknown>,
  request: string
) {
  const ajv = new Ajv();
  const parse = ajv.compileParser(schema);
  console.log("here");

  const data = parse(request);

  console.log("here");

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
