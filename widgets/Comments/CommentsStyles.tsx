import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

export const styles = StyleSheet.create({    
    commentsContainer: {
        flexDirection: 'column',
        rowGap: 4,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    commentsHeader: {
        flexDirection: 'row',
        columnGap: 8,
    },
    commentsTitle: {
        fontSize: 14,
        fontWeight: 500,
    },
    commentsCount: {
        fontSize: 14,
        color: '#808080',
    },
    commentsContent: {
        flexDirection: 'row',
        columnGap: 4,
        backgroundColor: '#E6E6E6',
        borderRadius: 8,
        padding: 8,
    },
    comment: {
        fontSize: 12,
        flex: 1,        
    },
})