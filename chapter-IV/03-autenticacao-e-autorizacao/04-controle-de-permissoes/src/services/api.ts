import axios, { AxiosError, HeadersDefaults, AxiosRequestHeaders } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from '../errors/AuthTokenError';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

interface CommonRequestHeaderProperties extends AxiosRequestHeaders {
  Authorization: string;
}

interface FailedRequestQueueProps {
  onSuccess: (value: string) => void;
  onFailure: (err: AxiosError) => void;
}

interface SetupAPIClientParams {
  ctx?: GetServerSidePropsContext;
}

let isRefreshing = false;
let failedRequestQueue: FailedRequestQueueProps[] = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx);

          const { 'nextauth.refreshToken': refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post('/refresh', {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data;

                setCookie(ctx, 'nextauth.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                });

                setCookie(
                  ctx,
                  'nextauth.refreshToken',
                  response.data?.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/',
                  }
                );

                // api.defaults.headers['Authorization'] = `Bearer ${token}`;
                api.defaults.headers = {
                  Authorization: `Bearer ${token}`,
                } as CommonHeaderProperties;

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestQueue = [];
              })
              .catch((error) => {
                failedRequestQueue.forEach((request) =>
                  request.onFailure(error)
                );
                failedRequestQueue = [];

                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token) => {
                originalConfig.headers = {
                  Authorization: `Bearer ${token}`,
                } as CommonRequestHeaderProperties;

                return resolve(api(originalConfig));
              },
              onFailure: (err) => reject(err),
            });
          });
        } else {
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
