interface eventType {
  body: string;
  httpMethod: string;
  requestContext: Record<string, unknown>;
}

export default function eventGenerator(
  body: Record<string, unknown>,
  httpMethod: string,
  ctx: Record<string, unknown>
): eventType {
  return {
    httpMethod,
    body: JSON.stringify(body),
    requestContext: ctx,
  };
}
