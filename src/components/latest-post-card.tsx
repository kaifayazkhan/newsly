import React, { useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Skeleton } from 'moti/skeleton'
import { Link } from 'expo-router';
import { Colors } from '@/constants/colors';
import Text from '@/components/ui/text'
import { getRelativeTime } from '@/utils/getRelativeTime';
import { SkeletonCommonProps } from '@/utils/skeleton-config';
import { PostType } from '@/store/interface';
import { FONTS } from '@/constants/fonts';

type LatestPostCardData = {
    post?: PostType | null
}

export const LatestPostSkeleton = () => (
    <Skeleton.Group show>
        <View style={styles.container}>
            <Skeleton width={245} height={120} {...SkeletonCommonProps} radius={'square'}>
            </Skeleton>
            <View style={styles.content}>
                <Skeleton {...SkeletonCommonProps} width='100%' >
                </Skeleton>
                <View style={styles.sourceInfo}>
                    <Skeleton width={30} height={30} radius={'round'} {...SkeletonCommonProps} >
                    </Skeleton>
                    <Skeleton {...SkeletonCommonProps} width='90%' >
                    </Skeleton>
                </View>
                <Skeleton {...SkeletonCommonProps} width='100%'  >
                </Skeleton>
            </View>
        </View>
    </Skeleton.Group>
)

const LatestPostCard = ({ post }: LatestPostCardData) => {
    const [isError, setIsError] = useState(false);
    return (
        <Pressable onPress={() => router.push(`/details/${post?.article_id}`)}>
            <View style={styles.container}>
                <Image source={isError ? require("../assets/images/not-found-2.png") : { uri: post?.image_url }} style={styles.image} onError={() => setIsError(true)} />
                <View style={styles.content}>
                    <Link href={`/details/${post?.article_id}`} style={styles.headline} numberOfLines={2}>{post?.title}</Link>
                    <View style={styles.sourceInfo}>
                        <Image source={{ uri: post?.source_icon }} style={styles.sourceIcon} />
                        <Text style={styles.sourceName}>{post?.source_name}</Text>
                    </View>
                    <Text style={styles.publishedDate}>{getRelativeTime(post?.pubDate ?? "")}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 245,
        backgroundColor: Colors.white,
        borderColor: Colors.secondaryText,
        borderWidth: 1,
        borderRadius: 10,
        height: 250,
        overflow: 'hidden',
    },
    image: {
        width: 245,
        height: 120,
        resizeMode: 'cover',
    },
    content: {
        padding: 10,
        gap: 5
    },
    headline: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: FONTS.BOLD,
        marginBottom: 5,
        color: Colors.active
    },
    sourceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
    },
    sourceIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    sourceName: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: FONTS.BOLD,
        color: Colors.secondaryText
    },
    publishedDate: {
        fontSize: 12,
        color: Colors.secondaryText,
        marginTop: 5,
        textAlign: 'right'
    },
});

export default LatestPostCard;
