import {
    StyleSheet,    
} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        backgroundColor: '#fff',
        height: '100%'
    },
    headerContainer: {
        rowGap: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6E6E6',
        borderRadius: 8,
        marginHorizontal: 16,
        paddingHorizontal: 8,
        height: 38,
    },
    filtersContainer: {
        rowGap: 8,
        marginTop: 8,
        paddingVertical: 16,        
        borderTopWidth: 1,
        borderTopColor: '#E6E6E6',
    },
    offersList: {
        paddingLeft: 16,
        marginBottom: 4,
    },
    item: {
        backgroundColor: '#E6E6E6',  
        marginEnd: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    input: {
        fontSize: 14,
        flex: 1,
        color: '#333',
        textAlignVertical: 'center', // Центрируем текст по вертикали
        paddingVertical: 0,
    },
    contentContainer: {
        paddingVertical: 10,
    },
    bottomSheet: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "67%", // Окно занимает половину экрана
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5, // Тень
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
        marginBottom: 8,
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
        height: "50%", // Окно занимает половину экрана
        backgroundColor: "transparent", // Прозрачная область для жестов
    },
    dropdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',        
    },
    filtersText: {
        color: '#808080',
        fontSize: 12,
    },
    featuresWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
    },
    featureItem: {
        backgroundColor: "#E6E6E6",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "transparent",
    },
    selectedFeatureItem: {
        backgroundColor: "rgba(14, 162, 222, 0.1)",
        borderColor: "#0EA2DE",
    },
    featureItemText: {
        color: "#000",
        fontWeight: 500,
    },
    selectedFeatureItemText: {
        color: "#000",
    },
    filtersBtns: {
        flexDirection: 'row',
        columnGap: 4,
        alignSelf: 'flex-end',
    },
    filtersBtnItem: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    filtersBtnText: {
        fontSize: 16,
        fontWeight: 500,
    },

    dropdownButton: {
        borderWidth: 1,        
        borderColor: '#E6E6E6',        
        width: 188,
        backgroundColor: "#fff",        
        borderRadius: 8,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropdownButtonText: {
        fontSize: 16,
    },
    dropdownOverlay: {
        position: "absolute",
        top: "70%",
        left: 0,
        width: "100%",
        zIndex: 20,        
    },
    dropdown: {
        backgroundColor: "#fff",        
        marginTop: 5,        
        elevation: 3,
        width: 188,
        borderLeftColor: '#E6E6E6',
        borderLeftWidth: 1,
        borderRightColor: '#E6E6E6',
        borderRightWidth: 1,
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    dropdownItem: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    dropdownItemText: {
        fontSize: 14,
    },
})