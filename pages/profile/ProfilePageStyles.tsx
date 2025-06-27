import {
    StyleSheet,    
} from 'react-native';

export const styles = StyleSheet.create({    
    userInfoContainer: {
        rowGap: 4,
        alignItems: 'center',
    },
    profileNavContainer: {
        flexDirection: 'column',
        rowGap: 8,
        marginVertical: 16,           
    },
    userNameText: {
        fontSize: 20,
    },
    nickNameText: {
        fontSize: 14,
        color: '#0EA2DE',
    },    
    profileNavButton: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E6E6E6',
        padding: 12,
        justifyContent: 'space-between',
        marginHorizontal: 16,
        alignItems: 'center',
    },
    profileNavButtonRow: {
        flexDirection: 'row',
        columnGap: 12,
        alignItems: 'center'
    },
    profileNavButtonText: {
        fontSize: 16,
    },
    videosRow: {
        marginLeft: 16,        
    }
});