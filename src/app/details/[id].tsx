import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import WebViewComponent from '@/components/web-view';
import useNewsStore from '@/store/newsStore';

const SinglePost = () => {
    const [link, setLink] = useState<string>('');
    const { id } = useLocalSearchParams();
    const { categoryWiseNews, latestNews } = useNewsStore(state => state);

    useEffect(() => {
        const post = [...latestNews, ...categoryWiseNews].find((item) => item.article_id === id);
        if (post) {
            setLink(post.link);
        }
    }, [id])

    return (
        <WebViewComponent url={link} />
    );
}

export default SinglePost;
