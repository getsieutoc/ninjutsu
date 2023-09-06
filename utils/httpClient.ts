import deepmerge from 'deepmerge';
import { HttpMethod } from '@/types';

const defaultOptions = {
  method: HttpMethod.GET,
  // TODO: Response to preflight request doesn't pass access control check:
  // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*'
  // when the request's credentials mode is 'include'.
  // credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

type RequestData = string | number | Record<string, unknown> | FormData;

type RequestOptions = Exclude<Partial<RequestInit>, 'body'>;

const get = async (url: string, options: RequestOptions = {}) => {
  const requestOptions = deepmerge(defaultOptions, options);

  const response = await fetch(url, requestOptions);

  return await response.json();
};

const post = async (
  url: string,
  data: RequestData,
  options: RequestOptions = {}
) => {
  const requestOptions = deepmerge(defaultOptions, {
    ...options,
    method: HttpMethod.POST,
    body: JSON.stringify(data),
  });

  const response = await fetch(url, requestOptions);

  return await response.json();
};

const patch = async (
  url: string,
  data: RequestData,
  options: RequestOptions = {}
) => {
  const requestOptions = deepmerge(defaultOptions, {
    ...options,
    method: HttpMethod.PATCH,
    body: JSON.stringify(data),
  });

  const response = await fetch(url, requestOptions);

  return await response.json();
};

const remove = async (
  url: string,
  data: RequestData,
  options: RequestOptions = {}
) => {
  const requestOptions = deepmerge(defaultOptions, {
    ...options,
    method: HttpMethod.DELETE,
    body: JSON.stringify(data),
  });
  const response = await fetch(url, requestOptions);

  return await response.json();
};

export const httpClient = { get, post, patch, delete: remove };
