import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        rowGap: 5,
        width: 160,
        marginStart: 4,
    },
    video: {
        width: 160,
        height: 90, 
        borderRadius: 10,       
    },
    infoContainer: {
        flexDirection: "row",        
    },
    thumbnail: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginLeft: 16,        
    },
    textContainer: {
        marginLeft: 4,        
    },
    title: {        
        fontSize: 14,
    },
    subTitleRow: {
        flexDirection: 'row',
        columnGap: 3,
        alignItems: 'center',
    },
    subTitle: {
        color: '#404040',
        fontSize: 12,
    },
    sep: {
        fontSize: 26,
        color: '#404040',
    },
    more: {
        marginRight: 10,
    },
    infoRow: {
        backgroundColor: '#000',
        paddingHorizontal: 3,
        paddingVertical: 1.5,
        opacity: .75,
        position: 'absolute',
        right: 5,
        bottom: 62,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 3,   
    },
    timeText: {
        color: '#fff',
    },      
})