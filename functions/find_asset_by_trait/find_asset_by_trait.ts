import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import validateAndReturnRequest from "functions/utils/validate_and_return_data";
import { computeMatches } from "./helperfunctions";
import { genericObject } from "./types";

const schema: genericObject = {
  properties: {
    chain: { type: "string" },
    contract: { type: "string" },
    owner: { type: "string" },
  },
  additionalProperties: true,
};

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let reqData = JSON.parse(event.body);
  try {
    reqData = await validateAndReturnRequest(schema, event.body);

    const matches = await computeMatches(reqData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        nfts: matches,
      }),
    };
  } catch (e) {
    return {
      statusCode: e.status,
      body: JSON.stringify({
        ...e,
        message: e.message,
      }),
    };
  }
};
