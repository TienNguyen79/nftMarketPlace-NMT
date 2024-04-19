import {
  getLanguage,
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
  removeRefreshToken,
  removeToken,
  saveRefreshToken,
  saveToken,
} from 'app/helpers/localStorage';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IndexedObject } from 'types/common';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export const CONFIG_DISABLE_PAGINATION = {
  headers: {
    'x-disable-pagination': true,
  },
};

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = getTokenFromLocalStorage();
  if (token !== null && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const language = getLanguage();
  if (language && config.headers) {
    config.headers['Accept-Language'] = language;
  }

  return config;
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance !== null ? this.instance : this.initHttp();
  }
  // REACT_APP_BASE_API_URL
  initHttp() {
    const http = axios.create({
      baseURL: process.env.REACT_APP_URL,
      headers,
    });

    http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error),
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private async handleError(error: IndexedObject) {
    const { response, config } = error;
    // console.log('🚀 ~ Http ~ handleError ~ config:', config);
    if (config.url !== '/auth' && config.url !== '/auth/refresh-tokens' && response) {
      if (response.status === StatusCode.Unauthorized && !config._retry) {
        // StatusCode.Unauthorized
        config._retry = true;

        try {
          const rs = await axiosClient.post<{ refreshToken: string }, { data: any }>(
            '/auth/refresh-tokens',
            {
              refreshToken: getRefreshTokenFromLocalStorage(),
            },
          );

          saveToken(rs.data.tokens.access.token);
          saveRefreshToken(rs.data.tokens.refresh.token);

          return this.http(config);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
}

export const axiosClient = new Http();
