import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import LatestPostCard, { LatestPostSkeleton } from './latest-post-card';
import Text from '@/components/ui/text'
import { PostType } from '@/store/interface';
import { Colors } from '@/constants/colors';
import { fetchLatestNews } from '@/utils/getNews';
import useNewsStore from '@/store/newsStore';
import { FONTS } from '@/constants/fonts';

const LatestPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { latestNews, setLatestNews } = useNewsStore(state => state)

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const data = await fetchLatestNews();
            setLatestNews(data.results);
            setIsLoading(false);
        })()
    }, [])

    if (isLoading) {
        return (
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    Array.from({ length: 10 }).fill(0)?.map((_, index) => (
                        <LatestPostSkeleton key={index} />
                    ))
                }
            </ScrollView>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Latest Posts</Text>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    latestNews?.map((post: PostType, index) => (
                        <LatestPostCard
                            key={index}
                            post={post}
                        />
                    ))
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: FONTS.BOLD,
        letterSpacing: 2,
        marginBottom: 15,
        color: Colors.title
    },
    scrollContainer: {
        flexDirection: 'row',
        gap: 20,
    }
})

export default LatestPosts;