import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const BottomNavigationHub = ({navigation}) => {
  const handlePress = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonLeft]}
          onPress={() => handlePress('Home')}>
          <Text style={styles.buttonText}>Esportes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonRight]}
          onPress={() => handlePress('Dashboard')}>
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>

        {/* Add more buttons as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36EBC7',
  },
  buttonLeft: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonRight: {
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default BottomNavigationHub;
