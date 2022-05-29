import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import HeaderApp from '../component/HeaderApp';
import UserContext from '../context/UserContext';
const general = require('../../style')
const clientHomeApi = require('./ClientHomeApi')

export default function ClientHome({navigation}){
    const [inf, setInfo] = React.useState();
    const user = React.useContext(UserContext);
    const [catchChangeEvent, setCatchChangeEvent] = React.useState(false);
    const [isInRoom, setIsInRoom] = React.useState(false);
    React.useEffect(
        () => {
            user.setIsLoading(true);
            clientHomeApi.getClientInfo(user.id, 
                (json) => {
                    setInfo(json);
                    setIsInRoom(true);
                    user.setIsLoading(false);
                },
                () => {
                    setIsInRoom(false);
                    user.setIsLoading(false);
                });
        }, [catchChangeEvent])
    if (isInRoom){
        return (
            <View style={styles.container}>
                <HeaderApp navigation={navigation}></HeaderApp>
                <Display info={inf} cId={user.id} callback={setCatchChangeEvent} catchChangeEvent={catchChangeEvent}/>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <HeaderApp navigation={navigation}></HeaderApp>
                <Text style={styles.text}>You are not in any hostel</Text>
            </View>
        )
    }
}

function Display({info, cId, callback, catchChangeEvent}){
    if (info){
        return (
            <View style={{
                flex: 1, 
                backgroundColor: '#ffffff',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={styles.header}>Hostel information</Text>
                <View style={styles.info}>
                    <Text style={styles.infoField}>Hostel name: {info.hostelName}</Text>
                    <Text style={styles.infoField}>Address: {info.address}</Text>
                    <Text style={styles.infoField}>Room Id: {info.roomName}</Text>
                    <Text style={styles.infoField}>Host name: {info.hostName}</Text>
                    <Text style={styles.infoField}>Host's phone number: {info.hostPhoneNum}</Text>
                </View>
                <Pressable 
                    style={styles.bt}
                    onPress={
                        ()=>{
                            clientHomeApi.leaveCurrentHostel(cId,
                                ()=>{
                                    callback(!catchChangeEvent)
                                })
                        }
                    }
                >
                    <Text style={styles.btText}>Leave hostel</Text>
                </Pressable>
            </View>
        )
    }
    else {
        return (<View style={{
            flex: 1, 
            backgroundColor: '#ffffff',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={styles.info}>
                <Text style={styles.infoField}>You are not in any room. If you have problem, please contact to your hostel manager</Text>
            </View>
        </View>)
    }
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