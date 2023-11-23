import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {loginStyle} from '../../styles/loginStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {promisseApi} from '../../utils/promisseApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');

  const handleRegister = () => {
    promisseApi(
      'post',
      'users/',
      data => {
        AsyncStorage.setItem('userToken', data.userToken);
        navigation.navigate('Home');
      },
      error => {
        console.error(error);
      },
      {
        email: email,
        password: password,
        name: name,
      },
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      header: () => <></>,
    });
  }, [navigation]);

  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.logo}>
        Sweat C
        <MaterialCommunityIcons name="volleyball" color="#36EBC7" size={50} />
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
          placeholder="Senha"
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={text => {
            setPassword(text);
          }}
          value={password}
        />
      </View>
      <View style={loginStyle.inputView}>
        <TextInput
          placeholder="Confirmar senha"
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={text => {
            setPasswordConfirm(text);
          }}
          value={passwordConfirm}
        />
      </View>
      <View style={loginStyle.inputView}>
        <TextInput
          placeholder="Nome"
          placeholderTextColor="#003f5c"
          onChangeText={text => {
            setName(text);
          }}
          value={name}
        />
      </View>
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
      <TouchableOpacity
        style={loginStyle.registerBtn}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <View style={loginStyle.btnContainer}>
          <Text style={loginStyle.loginText}>Login</Text>
          <View style={loginStyle.btnIcon}>
            <MaterialCommunityIcons name="arrow-left" color="white" size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
