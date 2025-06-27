import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({    
    bottomSheet: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: -2 },
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    line: {
        width: 67,
        height: 2,
        backgroundColor: "#808080",
        marginBottom: 10,
        alignSelf: "center",
    },
    sheetContent: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    gestureWrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50%",
        backgroundColor: "transparent",
    },
})