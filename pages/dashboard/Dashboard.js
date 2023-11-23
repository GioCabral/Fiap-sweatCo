import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {promisseApi} from '../../utils/promisseApi';
import BottomNavigationHub from '../../components/BottomNavigationHub';

const DashboardScreen = ({navigation}) => {
  const [activities, setActivities] = React.useState([]);

  useEffect(() => {
    promisseApi(
      'post',
      'activities/activity',
      data => {
        console.log(data);
        setActivities(data);
      },
      error => {
        console.log(error);
        if (error === 401) {
          navigation.navigate('Login');
        }
      },
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
      <ScrollView>
        <Text style={styles.title}>Activities Dashboard</Text>
        {activities.map(activity => (
          <View key={activity.id} style={styles.activityCard}>
            <Text style={styles.activityName}>{activity.name}</Text>
            <Text>{activity.description}</Text>
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
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
});

export default DashboardScreen;
