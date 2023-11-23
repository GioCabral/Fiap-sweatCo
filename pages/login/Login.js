import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {loginStyle} from '../../styles/loginStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {promisseApi} from '../../utils/promisseApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      header: () => <></>,
    });
  }, [navigation]);

  const handleLogin = () => {
    promisseApi(
      'post',
      'users/login',
      data => {
        AsyncStorage.setItem('userToken', data.userToken);
        navigation.navigate('Home');
      },
      error => {
        console.log(error);
      },
      {email, password},
    );
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.logo}>
        Sweat c
        <MaterialCommunityIcons name="volleyball" color="#36EBC7" size={60} />
      </Text>
      <View style={loginStyle.inputView}>
        <TextInput
          style={loginStyle.inputText}
          placeholder="E-mail"
          placeholderTextColor="#003f5c"
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </View>
      <View style={loginStyle.inputView}>
        <TextInput
          style={loginStyle.inputText}
          placeholder="Senha"
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity style={loginStyle.loginBtn} onPress={handleLogin}>
        <View style={loginStyle.btnContainer}>
          <Text style={loginStyle.loginText}>Login</Text>
          <View style={loginStyle.btnIcon}>
            <MaterialCommunityIcons
              name="arrow-right"
              color="white"
              size={20}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={loginStyle.registerBtn} onPress={handleRegister}>
        <View style={loginStyle.btnContainer}>
          <Text style={loginStyle.loginText}>registrar</Text>
          <View style={loginStyle.btnIcon}>
            <MaterialCommunityIcons
              name="arrow-right"
              color="white"
              size={20}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
