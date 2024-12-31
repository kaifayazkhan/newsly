import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

const CustomText = ({ style, children, ...props }: TextProps) => {
    return (
        <Text {...props} style={[styles.text, style]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: Colors.text,
    },
});

export default CustomText;
