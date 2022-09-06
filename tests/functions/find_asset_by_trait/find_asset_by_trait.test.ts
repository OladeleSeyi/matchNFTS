// @ts-nocheck
import axios from "axios";
import { main } from "../../../functions/find_asset_by_trait/find_asset_by_trait";

import { BadRequestError } from "../../../functions/utils/bad_request_error";
import eventGenerator from "../../utils/eventgenerator";
import { apiData2 } from "./test_data";

jest.mock("axios");

describe("validation errors", () => {
  test("should return a 400 error ", async (done) => {
    const reqBody = {
      body: {
        chain: "ETH",
        contract: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      },
    };
    const event = eventGenerator(reqBody, "POST");
    const lambda = await main(event, null, null);
    expect(lambda.statusCode).toBe(400);
    const response = JSON.parse(lambda.body);
    expect(response.message).toBe("Validation Error");
    done();
  });

  test("should return a 400 error ", async (done) => {
    const reqBody = {
      body: {
        chain: "ETH",
        owner: "somehash",
      },
    };
    const event = eventGenerator(reqBody, "POST");
    const lambda = await main(event, null, null);
    expect(lambda.statusCode).toBe(400);
    const response = JSON.parse(lambda.body);
    expect(response.message).toBe("Validation Error");
    done();
  });
});

describe("failed requests from api", () => {
  axios.request.mockImplementation(() => {
    throw new BadRequestError({
      message: "owner should be a valid address or ENS name",
      status: 400,
    });
  });
  it("should return api error to user ", async (done) => {
    const reqBody = {
      chain: "ETH",
      contract: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      owner: "0x54be3a794282c030b15e4",
    };
    const event = eventGenerator(reqBody, "POST");
    const lambda = await main(event, null, null);
    expect(lambda.statusCode).toBe(400);
    const response = JSON.parse(lambda.body);
    expect(response.message).toBe(
      "owner should be a valid address or ENS name"
    );
    done();
  });
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Passing requests, No next page", () => {
  test("should return api error to user ", async (done) => {
    axios.request.mockResolvedValue({ data: { ...apiData2 } });
    const reqBody = {
      chain: "ETH",
      contract: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      owner: "0x54be3a794282c030b15e4",
      traits: {
        mouth: ["Discomfort"],
      },
    };
    const event = eventGenerator(reqBody, "POST");
    const lambda = await main(event, null, null);
    expect(lambda.statusCode).toBe(200);
    const response = JSON.parse(lambda.body);
    expect(response.nfts.length).toBe(1);
    done();
  });
});
