import {
    StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,       
    },
    name: {
        fontSize: 14,
        fontWeight: 'regular',
    },
    url: {
        fontSize: 14,
        color: '#295FCC',
        fontWeight: 'regular',
    },
    linksRow: {
        flexDirection: 'column',
        rowGap: 8,
    },

    sectionTitle: {
        fontSize: 16, 
        fontWeight: 500,  
        marginBottom: 8,     
    },

    channelDetailsContainer: {
        flexDirection: 'row',
        columnGap: 10,
    },
    channelDetailsRow: {
        rowGap: 5,
    },
    channelDetailTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
    },
    detailName: {
        fontSize: 14,
        fontWeight: 500,
    },
  });