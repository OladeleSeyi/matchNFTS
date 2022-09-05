export default function eventGenerator(
  body: Record<string, unknown>,
  httpMethod: string,
  ctx: Record<string, unknown>
) {
  return {
    httpMethod,
    body: JSON.stringify(body),
    requestContext: ctx,
  };
}
