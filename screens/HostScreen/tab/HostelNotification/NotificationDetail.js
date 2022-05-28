import React from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import {getNotificationDetail} from './notificationApi' ;
import UserContext from '../../../context/UserContext';
const general = require('../../../../style')


export default function NotificationDetail({route, navigation}){
    const time = new Date(route.params.time);
    const subject = route.params.subject;
    const [content, setContent] = React.useState('');
    const user = React.useContext(UserContext);
    React.useEffect(
        () => {
            getNotificationDetail(user.id, route.params.id, 
                (json) => {
                    setContent(json.result);
                })
        }
    )
    
    
    return (
        <View style={styles.container}>
            <View style={{
                width: '90%',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <Pressable
                    onPress={
                        () => {
                            navigation.goBack();
                        }
                    }
                >
                    <Text style={{
                        fontSize: general.smalltext,
                        color: general.primary1,
                        fontWeight: '600',
                        marginTop: 10,
                        marginBottom: 10,
                        borderColor: general.primary1,
                        borderRadius:15,
                        borderWidth: 2,
                        padding: 10
                    }}>Back</Text>
                </Pressable>
            </View>
            <View style={{
                width: '90%',
                flexDirection: 'column',
                alignItems: 'baseline',
                justifyContent: 'flex-start'
            }}>
                <Text style={styles.text}>Create at: {String(time)}</Text>
                <Text style={styles.text}>Subject: {subject}</Text>
                <Text style={styles.text}>Content:</Text>
                <Text style={styles.text}>{content}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    bt : {
        fontSize: general.smalltext,
        color: general.primary1,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 20,
        padding: 10
    },
    view: {
        backgroundColor: general.backgroundColor,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        padding: 20,
        borderRadius: 15,
        flexDirection: 'column'
    },
    text: {
        fontSize: general.smalltext,
        color: general.primary1,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10,
    },
    pageNavi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '90%',
        alignItems: 'center'
    }
})