import React from 'react';
import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import { getNotificationList} from './notificationApi';
import UserContext from '../../../context/UserContext';
const general = require('../../../../style')


export default function NotificationList({navigation}){
    const [data, setData] = React.useState([]);
    const [pageId, setPageId] = React.useState(1);
    const user = React.useContext(UserContext);
    const numberPage = Math.floor((user.numNoti - 1) / 10) + 1;
    const [isLastPage, setIsLastPage] = React.useState(pageId === numberPage);

    React.useEffect(
        () => {
            user.setIsLoading(true);
            getNotificationList(user.id, pageId,
                (json) => {
                    user.setNumNoti(json.total);
                    setData(json.result);
                    user.setIsLoading(false);
                })
        }, [pageId, user.numNoti])

    return (
        <View style={styles.container}>
            <View
                style={{
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Text style={styles.text}>Total: {user.numNoti} notification</Text>
                <Pressable
                    onPress={
                        () => {
                            navigation.navigate('notificationPost')
                        }
                    }
                >
                    <Text style={{
                        fontSize: general.smalltext,
                        color: general.headerBackground,
                        fontWeight: '600',
                        marginTop: 10,
                        marginBottom: 10,
                        borderColor: general.primary1,
                        borderRadius:15,
                        borderWidth: 2,
                        padding: 10
                    }}>Add</Text>
                </Pressable>
            </View>
            <FlatList
                data={data}
                renderItem={
                    ({item}) => {
                        return (
                            <Item data={item} navigation={navigation}></Item>
                        )
                    }
                }
                showsVerticalScrollIndicator={false}
                style={{
                    width: '90%',
                }}
            ></FlatList>
            <View style={styles.pageNavi}>
                <Pressable
                    disabled={pageId == 1}
                    onPress={
                        () => {
                            setPageId(pageId - 1);
                        }
                    }
                >
                    <Text style={styles.bt}>Prev</Text>
                </Pressable>
                <Text style={styles.text}>{pageId} / {numberPage}</Text>
                <Pressable
                    disabled={isLastPage}
                    onPress={
                        () => {
                            setPageId(pageId + 1);
                            if (pageId > numberPage){
                                setIsLastPage(true);
                            }
                            else {
                                setIsLastPage(false);
                            }
                        }
                    }
                >
                    <Text style={styles.bt}>Next</Text>
                </Pressable>
            </View>
        </View>
    )
}

const Item = ({data, navigation}) => {
    const time = new Date(data.createAt)
    return (
        <Pressable
            onPress={
                ()=> {
                    navigation.navigate('notificationDetail', {
                        time: data.createAt,
                        subject: data.subject,
                        id: data.id
                    })
                }
            }
            style={styles.view}
        >
            <Text style={styles.text}>{String(time)}</Text>
            <Text style={styles.text}>{data.subject}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bt : {
        fontSize: general.smalltext,
        color: general.headerBackground,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        color: general.headerBackground,
        fontWeight: '600',
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
        color: general.headerBackground,
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