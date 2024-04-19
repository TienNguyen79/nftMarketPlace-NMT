import { axiosClient } from 'app/axios/axiosClient';
import { TLogin, TLogout, TRegister } from 'types/auth';
import { TCallback } from 'types/common';

export function requestRegister(data: TRegister & TCallback) {
  return axiosClient.post(`/auth/register`, data);
}

export function requestLogin(data: any) {
  return axiosClient.post(`/auth/login`, data);
}

export function requestLogout(data: TLogout) {
  return axiosClient.post(`/auth/logout`, { refreshToken: data.refreshToken });
}

// https://nft-marketplace-o6j5.onrender.com
