import React from 'react';
import {Modal, Pressable, StyleSheet, View, Text, TextInput } from 'react-native';

const general = require('../../style')

export default function LogInScreen({navigation}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameErr, setUsernameErr] = React.useState();
    const [passwordErr, setPasswordErr] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false)

    return (
        <View style={styles.container}>
            <Modal
                animationType='none'
                transparent={true}
                visible={modalVisible}
                onRequestClose ={
                    () => {
                        setModalVisible(false)
                    }
                }
            >
                <View style={styles.modal}>
                    <Text style={styles.modalText} >   
                        Username or password is is incorrect. If you don't have account, please register.
                    </Text>
                    <Pressable
                        style={styles.modalBt}
                        onPress={
                            () => {
                                setModalVisible(false);
                            }
                        }
                    >
                        <Text style={styles.modalBtText}>
                            Try again
                        </Text>
                    </Pressable>
                    <Pressable
                        style={styles.modalBt}
                        onPress={
                            () => {
                                navigation.navigate('Register')
                            }
                        }
                    >
                        <Text style={styles.modalBtText}>Register</Text>
                    </Pressable>
                </View>
            </Modal>
            <Text style={styles.text}>Log in</Text>
            <View style={{alignItems: 'baseline', width: 280}}>
                <Text style={{fontSize: general.smalltext}}>
                    Username:
                </Text>
            </View>
            <TextInput 
                style={styles.text_input} 
                onChangeText={setUsername}
                editable={true}
                value={username}
            ></TextInput>
            <View style={{alignItems: 'baseline', width: 280}}>
                <Text 
                    style={{
                        fontSize: 14,
                        color: 'red'
                    }}
                >
                    {usernameErr}
                </Text>
            </View>
            <View style={{alignItems: 'baseline', width: 280}}>
                <Text style={{fontSize: general.smalltext}}>
                    Password:
                </Text>
            </View>
            <TextInput 
                style={styles.text_input} 
                onChangeText={setPassword}
                editable= {true}
                value={password}
            ></TextInput>
            <View style={{alignItems: 'baseline', width: 280}}>
                <Text 
                    style={{
                        fontSize: 14,
                        color: 'red'
                    }}
                >
                    {passwordErr}
                </Text>
            </View>
            <Pressable 
                style={styles.bt}
                onPress={
                    () => {
                        let isValid = true;
                        if (haveSpecialChar(username.trim())) {
                            setUsernameErr('Username must not have special character');
                            isValid = false;
                        }
                        else if (username.trim() == '') {
                            setUsernameErr('Must enter username');
                            isValid = false;
                        }
                        else {
                            setUsernameErr('');
                        }
                        
                        if (haveSpecialChar(password.trim())) {
                            setPasswordErr('Password must not have special character');
                            isValid = false;
                        }
                        else if (password.trim() == '') {
                            setPasswordErr('Must enter password');
                            isValid = false;
                        }
                        else {
                            setPasswordErr('');
                        }

                        if (isValid){
                            if (username == 'C'){
                                navigation.navigate('Client', {
                                    id: 'C0001',
                                    name : username
                                });
                            }
                            else if (username == 'H') {
                                navigation.navigate('Host', {
                                    id: 'H0001',
                                    name : username
                                });
                            }
                            else {
                                setModalVisible(true)
                            }
                        }
                    }
                }
            >
                <Text style={styles.btLogin}>Log in</Text>
            </Pressable>
            <Pressable 
                style={styles.bt}
                onPress={
                    () => {
                        navigation.navigate('Register')
                    }
                }
            >
                <Text style={styles.btRegister}>Register</Text>
            </Pressable>
        </View>
    );
}

function haveSpecialChar(str){
    const format = /[^A-Za-z0-9]/
    if (str.length == 0) return false;
    return format.test(str)
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: general.backgroundColor,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    modal: {
        backgroundColor: general.popUp,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '90%',
        marginTop: '30%',
        marginLeft: '5%',
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 20
    },
    modalText : {
        width: '90%',
        marginTop: 20,
        marginBottom: 40,
        fontSize: general.smalltext,
        fontWeight: '500'
    },
    modalBt : {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 20,
        width: '50%'
    },
    modalBtText: {
        height: 40,
        paddingTop: 9,
        textAlign: 'center',
        fontSize: general.smalltext,
        fontWeight: '500'
    },
    text : {
        fontSize: general.header1,
        marginBottom: 40
    },
    text_input : {
        backgroundColor: '#ffffff',
        fontSize: general.smalltext,
        height: 60,
        width: 280,
        alignContent: 'center',
        paddingLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'normal',
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 20
    },
    bt : {
        width: 200,
        marginTop: 20
    },
    btLogin : {
        fontSize: general.text,
        height: 40,
        backgroundColor: general.primary1,
        color: '#ffffff',
        borderColor: general.primary1,
        borderRadius: 20,
        borderWidth: 2,
        textAlign: 'center'
    },
    btRegister : {
        fontSize: general.text,
        height: 40,
        color: general.primary1,
        backgroundColor: '#ffffff',
        borderColor: general.primary1,
        borderRadius: 20,
        borderWidth: 2,
        textAlign: 'center'
    }
})