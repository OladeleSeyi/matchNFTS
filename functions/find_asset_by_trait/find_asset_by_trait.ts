import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { AxiosRequestConfig, AxiosResponse, default as axios } from "axios";

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const reqData = JSON.parse(event.body);
  // console.log("data", reqData);

  const matches = await computeMatches(reqData);

  // searchForTraits(data, opt);
  return {
    statusCode: 200,
    body: JSON.stringify({
      nfts: matches,
    }),
  };
};
async function computeMatches(reqData) {
  let match: Response[];
  let nextPage: string | null;
  let options: AxiosRequestConfig = {
    method: "GET",
    url: "https://eth-mainnet.g.alchemy.com/nft/v2/demo/getNFTs",
    params: {
      owner: "0x54be3a794282c030b15e43ae2bb182e14c409c5e",
      "contractAddresses[]": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      withMetadata: "true",
    },
    headers: { Accept: "application/json" },
  };

  let apiResponse = await callAlchemyApi(options);

  let data: any[] = apiResponse.ownedNfts;
  nextPage = apiResponse.pageKey;

  while (nextPage) {
    options.params.pageKey = nextPage;
    let newApiResponse = await callAlchemyApi(options);
    nextPage = newApiResponse.pageKey ? newApiResponse.pageKey : null;
    let nftBatch = newApiResponse.ownedNfts;
    data = [...data, ...nftBatch];
  }

  // let assets = await getTraitsFromAlchemy(data);
  match = searchForTraits(data, reqData.traits);

  return match;
}

type genericObject = {
  [key: string]: string | genericObject;
};

type traitType = {
  value: string;
  trait_type: string;
};

interface AlchemyResponseType {
  ownedNfts: OwnedNftType<genericObject>[];
  totalCount: Number;
  pageKey: string | null;
  blockHash: string;
}

interface OwnedNftType<T> {
  metadata: {
    image: string;
    attributes: traitType[];
  };
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

function searchForTraits(data, opt) {
  const resultBox = [];
  data.map((nftTraits, i) => {
    nftTraits?.metadata?.attributes?.map((trait) => {
      for (const key in opt) {
        if (key == trait.trait_type.toLowerCase()) {
          opt[key].map((str: string) => {
            if (str.toLowerCase() === trait.value.toLowerCase()) {
              resultBox.push(nftTraits);
              // console.log(i);
              data.splice(i, 1);
            }
          });
        }
      }
    });
  });
  return resultBox;
}
