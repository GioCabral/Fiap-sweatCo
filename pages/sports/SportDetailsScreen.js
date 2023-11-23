// SportDetailsScreen.js
import React, {useRef, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {promisseApi} from '../../utils/promisseApi';
import {sportsStyle} from '../../styles/sportsStyle';
import {Snackbar} from 'react-native-paper';

const SportDetailsScreen = ({navigation}) => {
  const route = useRoute();
  const {id, name} = route.params;
  console.log(route.params);

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef(null);

  const startChronometer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000); // Increment time every second (1000 milliseconds)
  };

  const stopChronometer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const submitTime = () => {
    // Here, you can handle the submission of the time value (e.g., send it to an API, save it, etc.)
    // For now, let's log the time to the console
    console.log(`Time: ${time} seconds`);
    stopChronometer();
    setTime(0); // Reset time to 0 after submission

    promisseApi(
      'post',
      'sports/activity',
      data => {
        console.log(data);
        setVisible(true);
      },
      error => {
        console.log(error);
        if (error === 401) {
          navigation.navigate('Login');
        }
      },
      {id: id, time: time},
    );
  };

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  const onDismissSnackBar = () => setVisible(false);

  // Use o ID para buscar os detalhes específicos do esporte
  // Exiba os detalhes do esporte com base no ID

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={sportsStyle.header}>{name}</Text>
      {/* Renderize os detalhes do esporte com base no ID */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24}}>{formatTime(time)}</Text>
        {!isRunning ? (
          <Button title="Start" onPress={startChronometer} />
        ) : (
          <Button title="Stop" onPress={stopChronometer} />
        )}
        <Button
          title="Submit"
          onPress={submitTime}
          disabled={!time || isRunning}
        />
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{backgroundColor: 'green'}}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something when 'Undo' is pressed
            onDismissSnackBar();
          },
        }}>
        Atividade registrada!
      </Snackbar>
    </View>
  );
};

export default SportDetailsScreen;
