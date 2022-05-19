import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../screens/LogIn/LogIn';
import RegisterScreen from '../screens/Register/Register';
import ClientScreen from '../screens/ClientScreen/Client';
import HostScreen from '../screens/HostScreen/Host';

const Stack = createNativeStackNavigator()

function AppNavigator() {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={LogInScreen} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name='Client' component={ClientScreen} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name='Host' component={HostScreen} options={{headerShown: false}}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default AppNavigator;