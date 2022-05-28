import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View} from 'react-native';
import HeaderApp from '../../../component/HeaderApp';
import NotificationList from './NotificationList';
import NotificationDetail from './NotificationDetail';
import NotificationAdd from './NotificationAdd';

const notificationStack = createNativeStackNavigator();

export default function HostelNotification({navigation}){
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            width: '100%'
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
                <notificationStack.Screen 
                    name='notificationPost'
                    component={NotificationAdd}
                    options={{
                        headerShown: false
                    }}
                ></notificationStack.Screen>
            </notificationStack.Navigator>
        </View>
    )
}