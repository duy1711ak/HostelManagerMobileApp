import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import HeaderApp from '../../component/HeaderApp';

const general = require('../../../style')

export default function HostelRoom({navigation}){
    return (
        <View style={styles.container}>
            <HeaderApp navigation={navigation}></HeaderApp>
            <Text>Room List</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    }
})