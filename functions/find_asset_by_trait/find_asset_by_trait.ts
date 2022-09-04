import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { computeMatches } from "./helperfunctions";

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const reqData = JSON.parse(event.body);
  // validate
  const matches = await computeMatches(reqData);
  return {
    statusCode: 200,
    body: JSON.stringify({
      nfts: matches,
    }),
  };
};
