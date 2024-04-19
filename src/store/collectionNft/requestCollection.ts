import { axiosClient } from 'app/axios/axiosClient';

export function requestGetAllCollection() {
  return axiosClient.get(`/collectionNfts?limit=9999&page=1`);
}

export function requestGetCollectionById(id: string) {
  return axiosClient.get(`/collectionNfts/${id}?limit=9999&page=1`);
}
