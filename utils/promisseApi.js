import axios from 'axios';
// Importar o AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const headers = AsyncStorage.getItem('userToken')
  ? {usertoken: AsyncStorage.getItem('userToken')}
  : {};

export const baseURL = 'http://localhost:2540/api/';

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
    data: body,
  };

  let token = await AsyncStorage.getItem('userToken');

  configAxios.headers
    ? (configAxios.headers.usertoken = token)
    : (configAxios.headers = {usertoken: token});

  await axios(configAxios)
    .then(data => {
      callbackData(data.data);
    })
    .catch(err => {
      if (err && err.response && err.response.status === 401) {
        AsyncStorage.removeItem('userToken');
        callbackError(401);
      }
    });
};
