import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tab1 from './tabStep1';
import Tab2 from './tabStep2';

const Tab = createNativeStackNavigator()
export default function RegisterTab(){
    return ( 
        <Tab.Navigator initialRouteName='Step1'>
            <Tab.Screen name='Step1' component={Tab1} options={{headerShown: false}}></Tab.Screen>
            <Tab.Screen name='Step2' component={Tab2} options={{headerShown: false}}></Tab.Screen>
        </Tab.Navigator>
    )
}