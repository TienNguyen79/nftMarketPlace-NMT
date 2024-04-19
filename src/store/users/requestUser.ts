import { axiosClient } from 'app/axios/axiosClient';
import { Tuser2 } from 'types/user';

export function requestGetCurrentUser() {
  return axiosClient.get(`/users/detail`);
}

export function requestGetaUser(id: string) {
  return axiosClient.get(`/users/${id}`);
}

export function requestGetUserRanking() {
  return axiosClient.get(`/users/ranking`);
}

export function requestUpdateCurrentUser(data: any) {
  return axiosClient.patch(`/users/detail`, data);
}
