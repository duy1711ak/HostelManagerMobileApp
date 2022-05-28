import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View} from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import NotificationList from './NotificationList';
import NotificationDetail from './NotificationDetail';

const notificationStack = createNativeStackNavigator();

export default function ClientNotification({navigation}){
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            width: '100%',
            padding: 0
        }}>
            <HeaderApp navigation={navigation}></HeaderApp>
            <notificationStack.Navigator
                initialRouteName='notificationList'
                sceneContainerStyle={{
                    width: '100%'
                }}
            >
                <notificationStack.Screen 
                    name='notificationList'
                    component={NotificationList}
                    options={{
                        headerShown: false
                    }}
                ></notificationStack.Screen>
                <notificationStack.Screen 
                    name='notificationDetail'
                    component={NotificationDetail}
                    options={{
                        headerShown: false
                    }}
                ></notificationStack.Screen>
            </notificationStack.Navigator>
        </View>
    )
}