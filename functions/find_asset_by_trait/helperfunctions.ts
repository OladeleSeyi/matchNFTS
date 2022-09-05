import { AxiosRequestConfig, AxiosResponse, default as axios } from "axios";
import { AlchemyResponseType, OwnedNftType, RequestSchema } from "./types";

export async function computeMatches(
  reqData: RequestSchema
): Promise<OwnedNftType[]> {
  let match: OwnedNftType[];
  let nextPage: string | null;
  let options: AxiosRequestConfig = {
    method: "GET",
    url: process.env.ALCHEMY_API,
    params: {
      owner: reqData.owner,
      "contractAddresses[]": reqData.contract,
      withMetadata: "true",
    },
    headers: { Accept: "application/json" },
  };

  let apiResponse = await callAlchemyApi(options);

  let data: OwnedNftType[] = apiResponse.ownedNfts;
  nextPage = apiResponse.pageKey;

  while (nextPage) {
    options.params.pageKey = nextPage;
    let newApiResponse = await callAlchemyApi(options);
    nextPage = newApiResponse.pageKey ? newApiResponse.pageKey : null;
    let nftBatch = newApiResponse.ownedNfts;
    data = [...data, ...nftBatch];
  }
  match = searchForTraits(data, reqData.traits);

  return match;
}

async function callAlchemyApi(
  options: AxiosRequestConfig
): Promise<AlchemyResponseType> {
  console.log("call");
  let res = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error("Error getting Nfts");
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
