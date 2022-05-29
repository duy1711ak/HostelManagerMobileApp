import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ClientHome from './ClientHome';
import ClientNotification from './ClientNotification';
import UserContext from '../context/UserContext';
import AppLoader from '../component/AppLoader';

const general = require('../../style')

const Tab = createBottomTabNavigator();

export default function ClientScreen({route, navigation}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const user = {
        id: route.params.id,
        name: route.params.name,
        setIsLoading: setIsLoading
    }
    return (
        <>
            <UserContext.Provider value={user}>
                <Tab.Navigator 
                    initialRouteName='ClientHome'
                    sceneContainerStyle={{
                        flex: 1,
                        width: '100%'
                    }}
                    backBehavior='none'
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
            
                            if (route.name === 'ClientHome') {
                                iconName = 'home' 
                            }
                            else {
                                iconName = 'bell'
                            }
                            return <Icon name={iconName} size={size} color={color}></Icon>
                        },
                        tabBarActiveTintColor: general.primary1,
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen 
                        name='ClientHome' 
                        component={ClientHome}
                        options={{
                            headerShown: false,
                            tabBarLabel:'Home'
                        }}
                    ></Tab.Screen>
                    <Tab.Screen 
                        name='ClientNotification' 
                        component={ClientNotification}
                        options={{
                            headerShown: false,
                            tabBarLabel:'Notification'
                        }}
                    ></Tab.Screen>
                </Tab.Navigator>
            </UserContext.Provider>
            {isLoading? <AppLoader/> : null}
        </>
    );
}