import qs from 'querystringify';
import _ from 'lodash';
type TRequestHeader = {
  'Content-Type': string;
  Accept: string;
  Authorization?: string;
};

export let DEFAULT_HEADERS: TRequestHeader = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const SERVICE_TYPES = {
  GATEWAY_URL: process.env.GATEWAY_URL,
};

const STATUS_CODE = {
  unauthorized: 401,
};

export const setToken = (token: string) => {
  DEFAULT_HEADERS = {
    ...DEFAULT_HEADERS,
    Authorization: `${token}`,
  };
};

const handleResponse = async (
  result: any,
  resolve: (params?: any) => void,
  reject: (params?: any) => void,
) => {
  if (result && result.status === STATUS_CODE.unauthorized) {
    return reject();
  }
  const resultJson = await result.json();

  if (result.status > 300) {
    return reject(resultJson);
  }
  return resolve(resultJson);
};

export const api = {
  get: (endpoint: string, params: any): Promise<any> => {
    const options = {
      method: 'get',
      headers: DEFAULT_HEADERS,
    };

    return new Promise((resolve, reject) => {
      fetch(SERVICE_TYPES.GATEWAY_URL + endpoint + qs.stringify(params ? params : {}, true), options)
        .then(async result => {
          return handleResponse(result, resolve, reject);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  post: (endpoint: string, params: any): Promise<any> => {
    const options = {
      method: 'post',
      body: JSON.stringify(params),
      headers: DEFAULT_HEADERS,
    };

    return new Promise((resolve, reject) => {
      fetch(SERVICE_TYPES.GATEWAY_URL + endpoint, options)
        .then(async result => {
          return handleResponse(result, resolve, reject);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  put: (endpoint: string, params: any): Promise<any> => {
    const options = {
      method: 'put',
      body: JSON.stringify(params),
      headers: {
        ...DEFAULT_HEADERS,
        'Content-Type': 'application/json',
      },
    };
    return fetch(SERVICE_TYPES.GATEWAY_URL + endpoint, options).then(result => {
      return result.json();
    });
  },

  delete: (endpoint: string, params: any) => {
    const options = {
      method: 'delete',
      body: JSON.stringify(params),
      headers: {
        ...DEFAULT_HEADERS,
        'Content-Type': 'application/json',
      },
    };
    return fetch(SERVICE_TYPES.GATEWAY_URL + endpoint, options).then(result => {
      return result.json();
    });
  },
};
