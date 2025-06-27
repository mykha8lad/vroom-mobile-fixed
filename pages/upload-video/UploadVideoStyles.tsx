import {
    StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF', 
        padding: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#808080',
        marginBottom: 16,
    },
    addVideo: {
        marginVertical: 16,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#fcfcfc',
        borderRadius: 10,
        height: 195,        
        columnGap: 10,        
        alignItems: 'flex-start',
    },
    addBtn: {
        backgroundColor: '#0EA2DE',        
        padding: 5,
        borderRadius: 5,
        marginBottom: 3
    },
    input: {
        padding: 8,
        fontSize: 16,
        color: '#000',
        width: 215,
        height: '100%',
        textAlignVertical: 'top',
    },
    btnContainer: {
        flexDirection: 'column',
    },
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
    authorDisplayName: {
        fontSize: 18,
        fontWeight: 500,
    },
    authorName: {
        fontSize: 14,        
    },
    authorFollowers: {
        fontSize: 12,
        color: '#404040',  
        marginLeft: 8, 
    },
    uploadBtn: {
        padding: 16,
        backgroundColor: '#0EA2DE',
        borderRadius: 50,
        alignItems: 'center',        
    },
})