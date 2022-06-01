import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View} from 'react-native';
import HeaderApp from '../../../component/HeaderApp';
import NotificationList from './NotificationList';
import NotificationDetail from './NotificationDetail';
import NotificationAdd from './NotificationAdd';

export default function HostelNotification({navigation}){
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            width: '100%'
        }}>
            <HeaderApp navigation={navigation}></HeaderApp>
            <NotificationList></NotificationList>
        </View>
    )
}