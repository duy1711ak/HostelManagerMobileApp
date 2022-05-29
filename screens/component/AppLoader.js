import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

export default function AppLoader(){
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView source={require('../../asset/99833-edupia-loading.json')}
                autoPlay loop/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItem: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1
    }
})