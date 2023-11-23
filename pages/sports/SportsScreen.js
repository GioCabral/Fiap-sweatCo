import React, {useEffect} from 'react';
import {sportsStyle} from '../../styles/sportsStyle';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {promisseApi} from '../../utils/promisseApi';
import BottomNavigationHub from '../../components/BottomNavigationHub';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SportsScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      header: () => <></>,
    });
  }, [navigation]);

  const [sports, setSports] = React.useState([]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  useEffect(() => {
    handleSports();
  }, []);

  const handleSports = () => {
    promisseApi(
      'post',
      'sports',
      data => {
        setSports(data);
      },
      error => {
        console.log(error);
        if (error === 401) {
          navigation.navigate('Login');
        }
      },
    );
  };

  return (
    <View style={sportsStyle.container}>
      <View style={{alignContent: 'center', zIndex: 100}}>
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 100,
          }}>
          {/* Ícone de perfil */}
          <MaterialCommunityIcons name="logout" color="black" size={30} />
          <Text style={{fontSize: 15}}>Sair</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {sports.map(sport => {
          return (
            <TouchableOpacity
              key={sport.name}
              style={sportsStyle.sportButton}
              onPress={() =>
                navigation.navigate('SportDetails', {
                  id: sport._id,
                  name: sport.name,
                })
              }>
              <Text style={sportsStyle.sportButtonText}>{sport.name}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={30}
                color="#ccc"
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <BottomNavigationHub navigation={navigation} />
    </View>
  );
}
