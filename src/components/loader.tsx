import React from 'react';
import {
    StyleSheet, View, ActivityIndicator
} from 'react-native';
import { Colors } from '@/constants/colors';

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.active} />
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        zIndex: 1,
    }
})

export default Loader;
