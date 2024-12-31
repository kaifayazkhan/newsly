import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Text from '@/components/ui/text'
import PostByCategoryCard, { SkeletonCategoryPost } from './post-by-category-card';
import { fetchNewsByCategory, fetchMoreNewsByCategory } from '@/utils/getNews';
import useNewsStore from '@/store/newsStore';
import { PostType } from '@/store/interface';
import { Colors } from '@/constants/colors';


const PostByCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [pageNo, setPageNo] = useState<string>('');

    const { category, categoryWiseNews, setCategoryWiseNews } = useNewsStore(state => state)

    useEffect(() => {
        (async () => {
            if (!category) {
                console.warn('No category selected.');
                return;
            }

            setIsLoading(true);
            const data = await fetchNewsByCategory(category);
            setCategoryWiseNews(data.results);
            setPageNo(data.nextPage);
            setIsLoading(false);
        })()
    }, [category, setCategoryWiseNews])

    const handleLoadMore = async () => {
        if (!pageNo) {
            Alert.alert('No more posts to load.');
            return;
        }

        setIsLoadingMore(true);
        const data = await fetchMoreNewsByCategory(category, pageNo)
        setCategoryWiseNews([...categoryWiseNews, ...data.results]);
        setPageNo(data.nextPage);
        setIsLoadingMore(false);
    }

    if (isLoading) {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    Array.from({ length: 10 }).fill(0)?.map((_, index) => (
                        <SkeletonCategoryPost key={index} />
                    ))
                }
            </ScrollView>
        );
    }

    const LoadMore = () => {
        if (isLoadingMore) {
            return <ActivityIndicator size="large" color={Colors.active} />
        }

        return <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
            <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            {
                categoryWiseNews.length > 0 && categoryWiseNews?.map((post: PostType) => (
                    <PostByCategoryCard
                        key={post.article_id}
                        post={post}
                    />
                ))
            }
            <LoadMore />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        gap: 10
    },
    loadMoreButton: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.active,
        padding: 10,
        borderRadius: 10
    },
    loadMoreText: {
        fontSize: 16,
        color: Colors.white
    }
})

export default PostByCategory;
