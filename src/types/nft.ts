export type TNft = {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  collectionNft?: string;
  tags?: string[];
  id?: string;
  idNft?: string;
  userId?: string;
};

export type Tparams = {
  user?: string;
  status?: string;
  page?: number;
  limit?: number;
};
