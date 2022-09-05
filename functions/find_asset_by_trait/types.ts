export type genericObject = {
  [key: string]: boolean | string | string[] | genericObject[] | genericObject;
};

type traitType = {
  value: string;
  trait_type: string;
};

export interface AlchemyResponseType {
  ownedNfts: OwnedNftType[];
  totalCount: number;
  pageKey: string | null;
  blockHash: string;
}

export interface OwnedNftType extends genericObject {
  metadata: {
    image: string;
    attributes: traitType[];
  };
}
export interface RequestSchema {
  chain: string;
  contract: string;
  owner: string;
  traits: {
    [key: string]: string[];
  };
}
