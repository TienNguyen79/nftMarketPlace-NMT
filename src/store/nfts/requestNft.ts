import { axiosClient } from 'app/axios/axiosClient';
import { TNft } from 'types/nft';

export function requestGetAllNft({
  name,
  collectionNft,
  user,
  status,
  page,
  limit = 9,
}: {
  name?: string;
  collectionNft?: string;
  user?: string;
  status?: string;
  page?: number;
  limit?: number;
} = {}) {
  const queryName = name ? `&name=${name}` : '';
  const queryCollectionNft = collectionNft ? `&collectionNft=${collectionNft}` : '';
  const queryUser = user ? `&user=${user}` : '';
  const queryStatus = status ? `&status=${status}` : '';
  const queryPage = page ? `&page=${page}` : '';

  const queryString = `?limit=${limit}${queryName}${queryCollectionNft}${queryUser}${queryStatus}${queryPage}`;

  return axiosClient.get(`/nfts${queryString}`);
}

export function requestGetaNft(id: string) {
  return axiosClient.get(`/nfts/${id}`);
}

export function requestCreateNft(data: TNft) {
  return axiosClient.post(`/nfts`, data);
}

export function requestupdateNft(data: TNft) {
  return axiosClient.patch(`/nfts/${data.id}`, {
    name: data.name,
    description: data.description,
    price: data.price,
    image: data.image,
    collectionNft: data.collectionNft,
  });
}

export function requestStatusSellNft(idNft: string) {
  return axiosClient.patch(`/nfts/sell-or-cancel-sell/${idNft}`);
}

export function requestDeleteNft(idNft: string) {
  return axiosClient.delete(`/nfts/${idNft}`);
}

export function requestGiveNft(data: TNft) {
  return axiosClient.patch(`/nfts/give/${data.idNft}`, { userId: data.userId });
}

export function requestBuyNft(idNft: string) {
  return axiosClient.patch(`/nfts/buy-nft/${idNft}`);
}
