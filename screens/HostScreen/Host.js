import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserContext from '../context/UserContext';
import HostelClient from './tab/HostelClient';
import HostelRoom from './tab/HostelRoom';
import HostelNotification from './tab/HostelNotification';
import AppLoader from '../component/AppLoader';

const general = require('../../style')

const Tab = createBottomTabNavigator();

export default function HostScreen({route, navigation}){
    const [roomList, setRoomList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [numNotification, setNumNotification] = React.useState(0);
    const user = {
        RoomList: roomList,
        SetRoomList: setRoomList,
        id: route.params.id,
        name: route.params.name,
        setIsLoading: setIsLoading,
        numNoti: numNotification,
        setNumNoti: setNumNotification
    }
    
    return (
        <>
            <UserContext.Provider value={user}>
                <Tab.Navigator
                    initialRouteName='HostelClient'
                    sceneContainerStyle={{
                        flex: 1,
                        width: '100%'
                    }}
                    size={30}
                    backBehavior='none'
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
            
                            if (route.name === 'HostelClient') {
                                iconName = 'user' 
                            } 
                            else if (route.name === 'HostelNotification') {
                                iconName = 'bell'
                            }
                            else if (route.name === 'HostelRoom') {
                                iconName = 'home'
                            }
                            return <Icon name={iconName} size={size} color={color}></Icon>
                        },
                        tabBarActiveTintColor: general.primary1,
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen 
                        name='HostelClient' 
                        component={HostelClient}
                        options={{
                            headerShown: false,
                            tabBarLabel:'Client'
                        }}
                    ></Tab.Screen>
                    <Tab.Screen 
                        name='HostelRoom' 
                        component={HostelRoom}
                        options={{
                            headerShown: false,
                            tabBarLabel:'Room'
                        }}
                    ></Tab.Screen>
                    <Tab.Screen 
                        name='HostelNotification' 
                        component={HostelNotification}
                        options={{
                            headerShown: false,
                            tabBarLabel:'Notification'
                        }}
                    ></Tab.Screen>
                </Tab.Navigator>
            </UserContext.Provider>
        {isLoading? <AppLoader></AppLoader> : null}
        </>
    )
}