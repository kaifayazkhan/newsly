import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/colors';
import LatestPosts from '@/components/latest-posts';
import Categories from '@/components/categories';
import PostByCategory from '@/components/post-by-category';

export default function Home() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.componentSpacing}>
                <LatestPosts />
            </View>
            <View style={styles.componentSpacing}>
                <Categories />
            </View>
            <View style={styles.componentSpacing}>
                <PostByCategory />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.background,
        padding: 20,
        paddingBottom: 50,
    },
    componentSpacing: {
        marginBottom: 20
    },
});

