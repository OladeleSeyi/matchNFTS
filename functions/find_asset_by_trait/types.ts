type genericObject = {
  [key: string]: string | genericObject;
};

type traitType = {
  value: string;
  trait_type: string;
};

export interface AlchemyResponseType {
  ownedNfts: OwnedNftType<genericObject>[];
  totalCount: Number;
  pageKey: string | null;
  blockHash: string;
}

export interface OwnedNftType<T> {
  metadata: {
    image: string;
    attributes: traitType[];
  };
}
