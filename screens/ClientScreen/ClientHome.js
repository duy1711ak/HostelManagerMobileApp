import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import HeaderApp from '../component/HeaderApp';
const general = require('../../style')

const info = {
    hostealName: 'Nhà trọ A',
    hostelAddress: 'Linh Trung, Thủ Đức',
    roomId: '001',
    host: 'Phạm Minh Duy',
    phoneNum: '0397720433'
}

export default function ClientHome({navigation}){
    return (
        <View style={styles.container}>
            <HeaderApp navigation={navigation}></HeaderApp>
            <View style={{
                flex: 1, 
                backgroundColor: '#ffffff',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={styles.header}>Hostel information</Text>
                <View style={styles.info}>
                    <Text style={styles.infoField}>Hostel name: {info.hostealName}</Text>
                    <Text style={styles.infoField}>Address: {info.hostelAddress}</Text>
                    <Text style={styles.infoField}>Room Id: {info.roomId}</Text>
                    <Text style={styles.infoField}>Host name: {info.host}</Text>
                    <Text style={styles.infoField}>Host's phone number: {info.phoneNum}</Text>
                </View>
                <Pressable style={styles.bt}>
                    <Text style={styles.btText}>Leave hostel</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    header : {
        fontSize: general.text,
        marginBottom: 40,
        fontWeight: '800',
        color: general.primary1
    },
    info : {
        paddingLeft: 30,
        marginBottom: 40,
        width: 280
    },
    infoField: {
        marginTop: 10,
        fontSize: general.smalltext,
        color: general.primary1,
        fontWeight: '600'
    },
    bt : {
        backgroundColor: general.backgroundColor,
        height: 40,
        width: 200,
        borderRadius: 15,
        borderColor: general.primary1,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btText : {
        fontWeight: '600',
        color: '#000000',
        fontSize: general.smalltext,
        textAlign: 'center'
    }
})