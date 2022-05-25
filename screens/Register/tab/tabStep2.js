import React from "react";
import {Pressable, View, Text, StyleSheet, TextInput, Modal} from "react-native";
import RegisterContext from "../../context/RegisterContext";
import axios from 'axios';
const general = require('../../../style')

export default function Tab2({navigation}){
    const user = React.useContext(RegisterContext)
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [usernameErr, setUsernameErr] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState('');
    const [confirmErr, setConfirmErr] = React.useState('');
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
                        Username is exists. Please enter different username.
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
                            Ok
                        </Text>
                    </Pressable>
                </View>
            </Modal>
            <Text style={styles.label}>Step 2. Create account</Text>
            <View style={styles.field}>
                <Text style={styles.fieldName}>Username:</Text>
            </View>
            <TextInput 
                style={styles.text_input}
                onChangeText={user.SetUsername}
                value={user.Username}
            >
            </TextInput>
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
            <View style={styles.field}>
                <Text style={styles.fieldName}>Password:</Text>
            </View>
            <TextInput 
                style={styles.text_input}
                onChangeText={user.SetPassword}
                value={user.Password}
            >
            </TextInput>
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
            <View style={styles.field}>
                <Text style={styles.fieldName}>Confirm password:</Text>
            </View>
            <TextInput 
                style={styles.text_input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            >
            </TextInput>
            <View style={{alignItems: 'baseline', width: 280}}>
                <Text 
                    style={{
                        fontSize: 14,
                        color: 'red'
                    }}
                >
                    {confirmErr}
                </Text>
            </View>
            <View style={styles.buttonView}>
                <Pressable 
                    style={styles.pressable}
                    onPress={
                        () => {
                            navigation.navigate('Login')
                        }
                    }
                >
                    <Text style={styles.button}>Cancel</Text>
                </Pressable>
                <Pressable 
                    style={styles.pressable}
                    onPress={
                        () => {
                            navigation.goBack()
                        }
                    }
                >
                    <Text style={styles.button}>Back</Text>
                </Pressable>
                <Pressable 
                    style={styles.pressable}
                    onPress = {
                        () => {
                            let isValid = true;
                            if (haveSpecialChar(user.Username)) {
                                setUsernameErr('Username must not have special character');
                                isValid = false;
                            }
                            else if (user.Username == '') {
                                setUsernameErr('Must enter username');
                                isValid = false;
                            }
                            else {
                                setUsernameErr('');
                            }
                            
                            if (haveSpecialChar(user.Password)) {
                                setPasswordErr('Password must not have special character');
                                isValid = false;
                            }
                            else if (user.Password == '') {
                                setPasswordErr('Must enter password');
                                isValid = false;
                            }
                            else {
                                setPasswordErr('');
                            }

                            if (haveSpecialChar(confirmPassword)) {
                                setConfirmErr('This field must not have special character');
                                isValid = false;
                            }
                            else if (confirmPassword == '') {
                                setConfirmErr('This field is required');
                                isValid = false;
                            }
                            else if (confirmPassword != user.Password) {
                                setConfirmErr('This field must be same with pasword field');
                                isValid = false;
                            }
                            else {
                                setConfirmErr('');
                            }

                            if (isValid){
                                register(user, navigation, setModalVisible);
                            }
                        }
                    }
                >
                    <Text style={styles.button}>Ok</Text>
                </Pressable>
            </View>
        </View>
    )
}

function haveSpecialChar(str){
    const format = /[^A-Za-z0-9]/
    return format.test(str)
}

async function register(user, navigation, callback){
    try {
        const response = await fetch('https://hostel0tdtd.herokuapp.com/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user.Name,
                phoneNum: user.PhoneNum,
                username: user.Username,
                password: user.Password,
                isClient: !user.IsHost,
                address: user.HostelAddress,
                hostelName: user.HostelName
            })
        });
        if (response.status == 200){
            const json = await response.json();
            if (json.isClient){
                navigation.navigate('Client', {
                    id: json.UId,
                    name: json.name
                });
            }
            else {
                navigation.navigate('Host', {
                    id: json.UId,
                    name: json.name
                });
            }
        }
        else {
            callback(true);
        }
    }
    catch (error) {
        console.log(error);
    }
}
const styles = StyleSheet.create({
    container : {
        backgroundColor: general.backgroundColor,
        flexDirection: "column",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: general.text,
        marginBottom: 20
    },
    field: {
        width: 280,
        alignItems: 'flex-start'
    },
    fieldName : {
        fontSize: general.smalltext,
        marginTop: 10,
        width: 280
    },
    text_input : {
        backgroundColor: '#ffffff',
        fontSize: general.smalltext,
        height: 40,
        alignContent: 'center',
        paddingLeft: 20,
        marginTop: 10,
        width: 280,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 15
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30,
        height: 40,
        width: 280
    },
    button : {
        height: 40,
        width: 80,
        borderRadius: 15,
        borderColor: general.primary1,
        borderWidth: 2,
        fontSize: general.smalltext,
        textAlign: 'center',
        paddingTop: 10
    },
    pressable : {
        height : 40,
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
})
