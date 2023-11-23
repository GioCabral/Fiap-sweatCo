import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {promisseApi} from '../../utils/promisseApi';
import BottomNavigationHub from '../../components/BottomNavigationHub';

const RankingScreen = ({navigation}) => {
  const [ranking, setRanking] = React.useState([]);

  useEffect(() => {
    promisseApi(
      'post',
      'ranking',
      data => {
        setRanking(data);
      },
      error => {
        console.log(error);
        if (error === 401) {
          navigation.navigate('Login');
        }
      },
      undefined,
    );
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      header: () => <></>,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>
      <ScrollView style={styles.list}>
        {ranking.map(place => (
          <View key={place._id} style={styles.activityCard}>
            <Text style={styles.activityName}>{place.user}</Text>
            <Text>{place.time} minutos praticados.</Text>
          </View>
        ))}
      </ScrollView>
      <BottomNavigationHub navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  list: {
    padding: 20,
  },
});

export default RankingScreen;
