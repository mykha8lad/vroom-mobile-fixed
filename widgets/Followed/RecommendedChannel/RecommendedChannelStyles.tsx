import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginHorizontal: 16,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between',        
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#E6E6E6',
        borderTopColor: '#E6E6E6',
    },
    author: {
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'center',
    },
    authorInfo: {
        flexDirection: 'column',
        rowGap: 4,
    },
    authorName: {
        fontSize: 14,
        fontWeight: 500,
    },
    authorUserName: {
        fontSize: 12,
        color: '#404040'
    },
    authorFollowersCount: {
        fontSize: 12,
        color: '#404040'
    },
    followBtn: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#0EA2DE',
        borderRadius: 5,
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 500,
    },
})