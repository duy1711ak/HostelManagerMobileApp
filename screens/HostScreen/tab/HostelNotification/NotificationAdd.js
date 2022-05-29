import React from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, Modal, ScrollView} from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import {postNotification} from './notificationApi';
import UserContext from '../../../context/UserContext';
const general = require('../../../../style')

export default function NotificationAdd({route, navigation}){
    const [subject, setSubject] = React.useState('');
    const [content, setContent] = React.useState('');
    const user = React.useContext(UserContext);
    const [popUp, setPopUp] = React.useState({visible: false, content:''});
    
    return (
        <View style={styles.container}>
            <Modal
                animationType='none'
                transparent={true}
                visible={popUp.visible}
                onRequestClose={
                    () => {
                        setPopUp({visible: false, content: ''})
                    }
                }
            >
                <View style={{
                    backgroundColor: '#0808086F',
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%'}}
                >
                    <View style={styles.Modal}>
                        <View style={styles.ModalContent}>
                            <Text style={styles.ModalText}>{popUp.content}</Text>
                        </View>
                        <View style={styles.ModalBtView}>
                            <Pressable 
                                style={styles.ModalBt}
                                onPress={
                                    () => {
                                        setPopUp({visible: false, content: ''})
                                    }
                                }
                            >
                                <Text style={styles.ModalBtText}>Ok</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView style={{width: '90%'}}>
                <View style={{
                    width: '90%',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Pressable
                        onPress={
                            () => {navigation.goBack()}}
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
                    marginBottom: 20,
                    marginTop: 20
                }}>
                    <Text style={styles.text}>Subject:</Text>
                    <AutoGrowingTextInput 
                        style={styles.textInput}
                        value={subject}
                        onChangeText={setSubject}
                    />
                    <Text style={styles.text}>Content:</Text>
                    <AutoGrowingTextInput 
                        style={styles.textInput}
                        value={content}
                        onChangeText={setContent}
                    />
                </View>
                <Pressable
                    onPress={
                        () => {
                            user.setIsLoading(true);
                            postNotification(user.id, subject, content, 
                                (json) => {
                                    user.setIsLoading(false);
                                    setPopUp({visible: true, content:'Successful'})
                                });
                        }
                    }
                >
                    <Text style={styles.bt}>Post</Text>
                </Pressable>
            </ScrollView>
        </View>
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
        color: general.primary1,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        width: 60
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
    textInput: {
        height: 100,
        fontSize: general.smalltext,
        width: '100%',
        paddingTop: 10,
        paddingLeft: 10,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 15
    },
    Modal: {
        backgroundColor: general.popUp,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%',
        width: '90%',
        marginTop: '30%',
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 20
    },
    ModalContent: {
        width: 240,
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 10
    },
    ModalText: {
        fontSize: general.smalltext,
        fontWeight: '500'
    },
    ModalTextInput: {
        height: 40,
        width: 240,
        paddingLeft: 20,
        paddingTop: 9,
        fontSize: general.smalltext,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: '#ffffff'
    },
    ModalBtView: {
        width: '90%',
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ModalBt: {
        width: '40%',
        height: 40
    },
    ModalBtText: {
        width: '100%',
        height: 40,
        textAlign: 'center',
        paddingTop: 10,
        fontSize: general.smalltext,
        fontWeight:'600',
        color: general.primary1,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: '#ffffff'
    }
})