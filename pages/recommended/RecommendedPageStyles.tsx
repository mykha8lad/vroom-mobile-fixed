import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',    
    },
    headerContainer: {
        marginTop: 12,
        marginBottom: 4,
        flexDirection: 'column',
        rowGap: 12,
    },
    navigationContainer: {
        paddingHorizontal: 16,        
        paddingTop: 12,
        paddingBottom: 21,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E6E6E6',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.05,
    },
    toolsList: {
        flexDirection: 'row',
        columnGap: 27,
    },
    offersList: {
        paddingLeft: width * 0.05,
        marginBottom: 4,
        marginTop: 12,
    },
    toolsIcons: {
        height: 19,
        width: 19,
    },
    navigationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navigationIcons: {
        height: 24,
        width: 24,
    },
    item: {
        backgroundColor: '#E6E6E6',  
        marginRight: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    itemTitle: {
        color: '#000',
    },
    tabBar: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ddd' },
    tabIcon: { width: 24, height: 24, resizeMode: 'contain' },
})