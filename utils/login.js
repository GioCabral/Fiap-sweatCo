const {promisseApi} = require('./promisseApi');
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (email, password) => {
  promisseApi(
    'post',
    'user',
    data => {
      AsyncStorage.setItem('userToken', data.token);
    },
    error => {},
    {
      email: email,
      password: password,
    },
  );
};
