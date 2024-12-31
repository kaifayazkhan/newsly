import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { Skeleton } from 'moti/skeleton'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Text from '@/components/ui/text'
import { getRelativeTime } from '@/utils/getRelativeTime';
import { Colors } from '@/constants/colors';
import { SkeletonCommonProps } from '@/utils/skeleton-config';
import { PostType } from '@/store/interface';
import { FONTS } from '@/constants/fonts';

interface PostByCategoryCardType {
    post?: PostType | null
}

export const SkeletonCategoryPost = () => {
    return (
        <Skeleton.Group show>
            <View style={styles.container}>
                <Skeleton
                    {...SkeletonCommonProps}
                    width={120}
                    height={128}
                    radius={20}
                />
                <View style={styles.content}>
                    <Skeleton {...SkeletonCommonProps} width={220} height={40} ></Skeleton>
                    <Skeleton {...SkeletonCommonProps} width={220} height={12}></Skeleton>
                    <Skeleton {...SkeletonCommonProps} width={220} height={14}></Skeleton>
                    <Skeleton {...SkeletonCommonProps} width={220} height={14} ></Skeleton>
                </View>
            </View>
        </Skeleton.Group>
    )
}

const PostByCategoryCard = ({ post }: PostByCategoryCardType) => {
    const { article_id, title, image_url, creator, category, pubDate } = post as PostType;
    const [isError, setIsError] = useState(false)

    return (
        <View style={styles.container}>
            <Image
                source={isError ? require("../assets/images/not-found-1.png") : { uri: image_url }}
                style={styles.image} onError={() => setIsError(true)}
            />
            <View style={styles.content}>
                <Link href={`/details/${article_id}`} numberOfLines={2} style={styles.headline}>
                    {title}
                </Link>
                {
                    creator !== null && creator[0] &&
                    <View style={styles.authorContainer}>
                        <EvilIcons name="pencil" size={18} color={Colors.text} />
                        <Text style={styles.author} numberOfLines={1}>{creator[0]}</Text>
                    </View>
                }
                <Text style={styles.category}>Category: {category.join(', ')}</Text>
                <Text style={styles.publishedTime}>{getRelativeTime(pubDate)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    image: {
        width: 120,
        height: 128,
        borderRadius: 20
    },
    content: {
        flex: 1,
        gap: 6
    },
    headline: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: FONTS.BOLD,
        marginBottom: 5,
        color: Colors.text
    },
    authorContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    author: {
        fontSize: 12,
        color: Colors.secondaryText
    },
    category: {
        fontSize: 14,
        color: Colors.secondaryText,
        marginBottom: 5
    },
    publishedTime: {
        fontSize: 14,
        color: Colors.active,
        textAlign: 'right',
        marginBottom: 5,
        fontWeight: 'bold',
        fontFamily: FONTS.BOLD
    }
})

export default PostByCategoryCard;
