import React from "react";
import {Pressable, View, Text, StyleSheet, TextInput} from "react-native";
import RegisterContext from "../../context/RegisterContext";
import { Picker } from "@react-native-picker/picker";
const general = require('../../../style.js')


export default function Tab1({navigation}){
    const user = React.useContext(RegisterContext)
    const pickerRef = React.useRef();
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Step 1. Enter information</Text>
            <View style={styles.field}>
                <Text style={styles.fieldName}>Full name:</Text>
            </View>
            <TextInput 
                style={styles.text_input}
                onChangeText={user.SetName}
                value={user.Name}
            >
            </TextInput>
            <View style={styles.field}>
                <Text style={styles.fieldName}>Role:</Text>
            <Picker
                ref={pickerRef}
                selectedValue={user.IsHost}
                onValueChange={(itemValue, itemIndex) => {
                    user.SetIsHost(itemValue);
                }}
                style={styles.dropdownlist}
            >
                <Picker.Item label="Host" value={true} style={styles.item}/>
                <Picker.Item label="Client" value={false} style={styles.item}/>
            </Picker>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldName}>Phone number:</Text>
            </View>
            <TextInput 
                style={styles.text_input}
                onChangeText={user.SetPhoneNum}
                value={user.PhoneNum}
                keyboardType='numeric'
            >
            </TextInput>
            <HostInfo user={user}></HostInfo>
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
                        ()=>{
                            navigation.navigate('Step2')
                        }
                    }
                >
                    <Text style={styles.button}>Next</Text>
                </Pressable>
            </View>
        </View>
    )
}

function HostInfo({user}){
    if (user.IsHost){
        return (
            <View style={styles.hostInfo} > 
                <View style={styles.field}>
                    <Text style={styles.fieldName}>Hostel name:</Text>
                </View>
                <TextInput 
                    style={styles.text_input}
                    onChangeText={user.SetHostelName}
                    value={user.HostelName}
                >
                </TextInput>
                <View style={styles.field}>
                    <Text 
                        style={styles.fieldName}
                    >Hostel address:</Text>
                </View>
                <TextInput 
                    style={styles.text_input}
                    onChangeText={user.SetHostelAddress}
                    value={user.HostelAddress}
                    autoComplete='street-address'
                >
                </TextInput>
            </View>
        )
    }
    else return null;
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
        width: 240,
        alignItems: 'flex-start'
    },
    fieldName : {
        fontSize: general.smalltext,
        marginTop: 5,
        width: 240,
        alignItems: 'baseline'
    },
    text_input : {
        backgroundColor: '#ffffff',
        fontSize: general.smalltext,
        height: 40,
        alignContent: 'center',
        paddingLeft: 20,
        paddingTop: 8,
        marginTop: 5,
        width: 240,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 15
    },
    hostInfo:{
        width: 240
    },
    dropdownlist: {
        fontSize: general.smalltext,
        height: 30,
        width: 160,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        paddingLeft: 15
    },
    item: {
        fontSize: general.smalltext,
        height: 30,
        width: 160,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 5,
        backgroundColor: '#ffffff',
        paddingLeft: 20
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        height: 40,
        width: 220
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
        height : 40
    }
})
