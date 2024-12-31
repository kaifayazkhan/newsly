import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Text from '@/components/ui/text'
import { categories } from '@/constants/categories';
import Chip from './chip';
import { Colors } from '@/constants/colors';
import useNewsStore from '@/store/newsStore';
import { FONTS } from '@/constants/fonts';

const Categories = () => {
    const setCategory = useNewsStore(state => state.setCategory);
    const category = useNewsStore(state => state.category);
    return (
        <View>
            <Text style={styles.categoryText}>Categories</Text>
            <ScrollView contentContainerStyle={styles.categoryContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                {categories.map((catg, index) => (
                    <TouchableOpacity key={index} onPress={() => setCategory(catg)}>
                        <Chip text={catg} active={category === catg} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 10
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontFamily: FONTS.BOLD,
        color: Colors.text,
    },
    activeButton: {
        backgroundColor: Colors.active
    }
})

export default Categories;
