import axios from 'axios';
// Importar o AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleError} from './handleError';

export const headers = AsyncStorage.getItem('userToken')
  ? {usertoken: AsyncStorage.getItem('userToken')}
  : {};

export const baseURL = 'http://127.0.0.1:2540/api/';

export const api = axios.create({
  baseURL: baseURL,
  headers,
});

export const promisseApi = async (
  method,
  path,
  callbackData,
  callbackError,
  body = {},
  config = {},
) => {
  let configAxios = {
    method: method,
    url: `${baseURL}${path}`,
    ...config,
  };

  if (body) configAxios.data = body;

  let token = await AsyncStorage.getItem('userToken');

  configAxios.headers
    ? (configAxios.headers.usertoken = token)
    : (configAxios.headers = {usertoken: token});

  await axios(configAxios)
    .then(data => {
      callbackData(data.data);
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      if (err && err.response && err.response.status === 401) {
        AsyncStorage.removeItem('userToken');
        callbackError(401);
      } else {
        callbackError(handleError(err));
      }
    });
};
