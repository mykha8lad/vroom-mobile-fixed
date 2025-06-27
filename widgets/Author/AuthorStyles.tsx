import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

export const styles = StyleSheet.create({
    authorContainer: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    authorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorLink: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
    },
    authorName: {
        fontSize: 18,
        fontWeight: 400,
    },
    authorFollowers: {
        fontSize: 12,
        color: '#404040',  
        marginLeft: 8, 
    },
    followBtn: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#0EA2DE',
        borderRadius: 5,
    },
    followBtnText: {
        fontSize: 14,
        color: '#fff',
    },
})