import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import UserContext from '../context/UserContext';

const general = require('../../style')

export default function HeaderApp({navigation}){
    const user = React.useContext(UserContext);
    return (
        <View style={{backgroundColor: 'ffffff'}}>
            <View style={styles.header}>
                <View style={styles.user}>
                    <Text
                        style={{
                            fontSize: general.smalltext,
                            color: '#ffffff',
                            fontWeight: '600'
                        }}
                    >
                        Welcome, {user.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: general.smalltext,
                            color: '#ffffff',
                            fontWeight: '600'
                        }}
                    >
                        UID: {user.id}
                    </Text>
                </View>
                <Pressable
                    onPress={
                        () => {
                            navigation.navigate('Login')
                        }
                    }
                    style={{
                        marginLeft: 20,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: 120
                    }}
                >
                    <Text style={styles.logOut}>
                        Log out
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: general.headerBackground,
        borderBottomWidth: 2,
        borderColor: general.primary1,
        height: 120,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#ffffff'
    },
    user : {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 240,
    },
    logOut: {
        height: 40,
        width: 100,
        borderRadius: 20,
        borderColor: general.primary1,
        borderWidth: 2,
        fontSize: general.smalltext,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        paddingTop: 10,
        color: general.headerBackground
    }
})