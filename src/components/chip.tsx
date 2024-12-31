import { StyleSheet, View } from 'react-native';
import Text from '@/components/ui/text'
import { Colors } from '@/constants/colors';

interface ChipProps {
    text: string;
    active: boolean
}

const Chip = ({ text, active }: ChipProps) => {
    return (
        <View style={[styles.container, active && styles.activeButton]}>
            <Text style={[styles.text, active && styles.activeButtonText]}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.secondaryText,
        backgroundColor: Colors.white
    },
    text: {
        color: Colors.secondaryText,
        fontSize: 12,
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    activeButton: {
        backgroundColor: Colors.active,
        borderColor: Colors.active
    },
    activeButtonText: {
        color: Colors.white
    }
})

export default Chip;
