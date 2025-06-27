import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        rowGap: 5,
      },
      video: {
        width: '100%',
        height: 200,        
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
        marginLeft: 16,
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
        color: '#404040',
      },
      more: {
        marginRight: 10,
      },
      timeView: {
        backgroundColor: '#000',
        paddingHorizontal: 3,
        paddingVertical: 1.5,
        opacity: .75,
        position: 'absolute',
        right: 10,
        bottom: 70,
        borderRadius: 5,
      },
      timeText: {
        color: '#fff',
      },      
})