import { AxiosRequestConfig, default as axios } from "axios";
import { BadRequestError } from "../utils/bad_request_error";
import { AlchemyResponseType, OwnedNftType, RequestSchema } from "./types";

export async function callAlchemyApi(
  options: AxiosRequestConfig
): Promise<AlchemyResponseType> {
  const res = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new BadRequestError({
        message: error?.response?.data || "Error retrieving assets",
        status: 400,
      });
    });
  return res;
}

function searchForTraits(data: OwnedNftType[], opt: RequestSchema["traits"]) {
  const resultBox = [];
  data.map((nftTraits, i) => {
    nftTraits?.metadata?.attributes?.map((trait) => {
      for (const key in opt) {
        if (key == trait.trait_type.toLowerCase()) {
          opt[key].map((str: string) => {
            if (str.toLowerCase() === trait.value.toLowerCase()) {
              resultBox.push(nftTraits);
              data.splice(i, 1);
            }
          });
        }
      }
    });
  });
  return resultBox;
}

export async function computeMatches(
  reqData: RequestSchema
): Promise<OwnedNftType[]> {
  let nextPage: string | null;
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://${reqData.chain}.g.alchemy.com/nft/v2/demo/getNFTs`,
    params: {
      owner: reqData.owner,
      "contractAddresses[]": reqData.contract,
      withMetadata: "true",
    },
    headers: { Accept: "application/json" },
  };

  const apiResponse = await callAlchemyApi(options);
  let data: OwnedNftType[] = apiResponse.ownedNfts;
  nextPage = apiResponse.pageKey;

  while (nextPage) {
    options.params.pageKey = nextPage;
    const newApiResponse = await callAlchemyApi(options);
    nextPage = newApiResponse.pageKey ? newApiResponse.pageKey : null;
    data = [...data, ...newApiResponse.ownedNfts];
  }
  const match: OwnedNftType[] = searchForTraits(data, reqData.traits);

  return match;
}
