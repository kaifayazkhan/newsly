import { Colors } from '@/constants/colors';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '@/components/ui/text';
import { WebView } from 'react-native-webview';
import Loader from './loader';
import { FONTS } from '@/constants/fonts';

interface WebViewComponentProps {
    url: string;
}

const WebViewComponent = ({ url }: WebViewComponentProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    if (error || !url) {
        return (
            <View style={styles.noUrlContainer}>
                <Text style={styles.noUrlText}>No content found</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {loading && (
                <Loader />
            )}
            <WebView
                source={{ uri: url }}
                style={styles.webview}
                mediaPlaybackRequiresUserAction={true}
                onError={(err) => {
                    setError(true)
                    setLoading(false)
                }}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    noUrlContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    noUrlText: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: Colors.secondaryText,
        fontFamily: FONTS.BOLD
    },
});

export default WebViewComponent;
