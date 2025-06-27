import {
    StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
    descriptionContainer: {
        paddingHorizontal: 16,
        flexDirection: 'column',
        rowGap: 4,
        marginTop: 14,
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
    },
    info: {
        flexDirection: 'row',
        columnGap: 8,
    },
    infoText: {
        fontSize: 12,
        color: '#808080',
    },    
})