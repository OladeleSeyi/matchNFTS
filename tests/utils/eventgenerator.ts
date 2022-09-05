export default function eventGenerator(
  body: Object,
  httpMethod: string,
  ctx: Object
) {
  return {
    httpMethod,
    body: JSON.stringify(body),
    requestContext: ctx,
  };
}
