import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from './pages/login/Login';
import {Register} from './pages/login/Register';
import {promisseApi} from './utils/promisseApi';
import {SportsScreen} from './pages/sports/SportsScreen';
import SportDetailsScreen from './pages/sports/SportDetailsScreen';
import DashboardScreen from './pages/dashboard/Dashboard';
import RankingScreen from './pages/ranking/RankingScreen';

const Stack = createStackNavigator();

function App() {
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    handleIsLogged();
  }, []);

  const handleIsLogged = () => {
    promisseApi(
      'post',
      'users/session',
      data => {
        console.log(data);
        setIsLogged(true);
      },
      error => {
        setIsLogged(false);
      },
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogged ? 'Home' : 'Login'}>
        <Stack.Screen name="Home" component={SportsScreen} />
        <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{handleIsLogged: handleIsLogged}}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SportDetails" component={SportDetailsScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Ranking" component={RankingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
