import React from 'react';
import {FlatList, StyleSheet, View, Text } from 'react-native';

import HeaderApp from '../component/HeaderApp';
const general = require('../../style')

const notification = [
    {
        time: new Date(2022, 5, 4, 10, 30, 0, 0),
        subject: 'Thông báo tiền điện tháng 5',
        content: 'Các phòng nhanh chóng đóng tiền điện nước cho chủ nhà thông qua'
    },
    {
        time: new Date(2022, 5, 3, 10, 30, 0, 0),
        subject: 'Thông báo tháng 5',
        content: 'Các phòng nhanh chóng đóng tiền điện nước cho chủ nhà thông qua'
    },
    {
        time: new Date(2022, 4, 4, 10, 30, 0, 0),
        subject: 'Thông báo tiền điện tháng 4',
        content: 'Các phòng nhanh chóng đóng tiền điện nước cho chủ nhà thông qua'
    },
    {
        time: new Date(2022, 4, 2, 10, 30, 0, 0),
        subject: 'Thông báo tháng 4',
        content: 'Các phòng nhanh chóng đóng tiền điện nước cho chủ nhà thông qua'
    },
    {
        time: new Date(2022, 5, 4, 10, 30, 0, 0),
        subject: 'Thông báo vệ sinh chung',
        content: '...'
    },
    {
        time: new Date(2022, 5, 4, 10, 30, 0, 0),
        subject: 'Thông báo tiền điện tháng 5',
        content: 'Các phòng nhanh chóng đóng tiền điện nước cho chủ nhà thông qua'
    },
    {
        time: new Date(2022, 5, 3, 10, 30, 0, 0),
        subject: 'Thông báo tháng 5',
        content: 'Các phòng nhanh chóng đóng tiền điện nước cho chủ nhà thông qua'
    },
    {
        time: new Date(2022, 4, 4, 10, 30, 0, 0),
        subject: 'Thông báo tiền điện tháng 4',
        content: 'Các phòng nhanh chóng đóng tiền điện nước cho chủ nhà thông qua'
    },
    {
        time: new Date(2022, 4, 2, 10, 30, 0, 0),
        subject: 'Thông báo tháng 4',
        content: 'Các phòng nhanh chóng đóng tiền điện nước cho chủ nhà thông qua'
    },
    {
        time: new Date(2022, 5, 4, 10, 30, 0, 0),
        subject: 'Thông báo vệ sinh chung',
        content: '...'
    }
]


export default function ClientNotification({navigation}){
    return (
        <View style={styles.container}>
            <HeaderApp navigation={navigation}></HeaderApp>
            <View 
                style={{
                    width: '95%', 
                    flex: 1, 
                    backgroundColor: '#ffffff',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
            >
                <Text style={{
                    marginTop: 10
                }}>Hiển thị 10 thông báo gần nhất</Text>
                <FlatList 
                    renderItem={
                        ({item}) => {
                            return <NotificationItem props={item}></NotificationItem>
                        }
                    }
                    data={notification}
                    showsVerticalScrollIndicator={false}
                >
                </FlatList>
                <View></View>
            </View>
        </View>
    )
}

function NotificationItem({props}){
    let time = (props.time).toString()
    return (
        <View style={styles.item}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.subject}>{props.subject}</Text>
            <Text style={styles.content}>{props.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: 'center',
    },
    item: {
        width: '100%', 
        backgroundColor: general.backgroundColor,
        marginTop: 20,
        padding: 20,
        borderRadius: 20,
        borderColor: general.primary1,
        borderWidth: 2
    },
    time : {
        fontSize: 16,
        margin: 10,
        borderColor: '#333333',
        borderBottomWidth: 1
    },
    subject : {
        fontSize: 16,
        margin: 10,
        borderColor: '#333333',
        borderBottomWidth: 1,
        fontWeight: '600'
    },
    content : {
        fontSize: 16,
        margin: 10
    }
})