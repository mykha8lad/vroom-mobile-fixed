import {
    StyleSheet,    
} from 'react-native'; 

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        rowGap: 10,
        height: '100%',
        backgroundColor: '#fff',
    },    
    channelHeader: {
        flexDirection: 'column',
        rowGap: 8,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    channelTitle: {
        flexDirection: 'row',
        columnGap: 16,
        alignItems: 'center',
    },
    channelTitleInfo: {
        flexDirection: 'column',
        rowGap: 4,
    },
    userNameText: {
        fontSize: 20,
        fontWeight: 'medium',    
    },
    userFollowersText: {
        fontSize: 14,
    },
    nickNameText: {
        fontSize: 14,
        color: '#0EA2DE',
    },
    channelSocialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    followingBtn: {
        flexDirection: 'row',
        columnGap: 11,
        backgroundColor: '#E6E6E6',
        paddingVertical: 5,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    channelSocialRow: {
        flexDirection: 'row',
        columnGap: 4,
    },
     // Контейнер меню (отсюда можно добавить отступы сверху/снизу, если нужно)
    menuContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        backgroundColor: '#fff',
    },
  // Внутренний контейнер с отступом слева 16 пикселей и горизонтальным расположением элементов
    menuInnerContainer: {
        flexDirection: 'row',
        marginLeft: 16,
    },
  // Стили для пункта меню
    menuItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    menuItemText: {
        fontSize: 14,
        color: '#808080',
    },
    menuItemTextSelected: {
        color: '#000',
    },  
    indicator: {
        height: 2,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 0,
    },  
    pageContainer: {
        flex: 1,
    },
})