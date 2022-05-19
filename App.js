/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from 'react-native';

const general = require('./style')

import AppNavigator from './navigations/navigators';

function App(){

  return (
    <View style={{flex:1}}>
      <AppNavigator></AppNavigator>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container : {
      backgroundColor: general.backgroundColor,
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
  },
  text : {
      fontSize: general.header1,
      marginBottom: 40
  },
  text_input : {
      backgroundColor: '#ffffff',
      fontSize: general.smalltext,
      height: 60,
      width: 240,
      alignContent: 'center',
      paddingLeft: 20,
      marginTop: 10,
      marginBottom: 30,
      fontWeight: 'normal',
      borderColor: general.primary1,
      borderWidth: 2,
      borderRadius: 30
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
