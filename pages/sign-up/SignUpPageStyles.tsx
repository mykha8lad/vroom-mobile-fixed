import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16, 
    },
    datePickerButton: {
        backgroundColor: '#f9f9f9',
    },
    pickerItem: {
        fontSize: 16,
        color: '#808080',
        height: 39,
    },
    arrowBack: {
        marginTop: height * 0.02,
        marginLeft: 16,    
        width: 40,
        height: 40,    
        justifyContent: 'center',
    },
    arrowIcon: {
        width: width * 0.06,
        height: width * 0.06,
    },
    header: {
        fontSize: width * 0.05,
        alignSelf: 'center',
        marginTop: height * 0.08,
        marginBottom: height * 0.02,
    },
    label: {
        fontSize: width * 0.035,
        marginBottom: 5,
        color: '#808080',
    },
    input: {
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 10,    
        height: 39,
        padding: 10,
        fontSize: width * 0.04,
    },
    dateOfBirthInput: {
        height: 39,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 10,
        justifyContent: 'center',
        height: 39,
        overflow: 'hidden',
    },
    picker: {
        fontSize: 16,
        height: 59,
        color: '#000',
        marginTop: Platform.OS === 'ios' ? -10 : 0,
    },
    dateOfBirthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        columnGap: width * 0.02,
    },
    button: {
        borderRadius: 10,    
        height: 39,    
        alignItems: 'center',
        justifyContent: 'center',  
        marginVertical: height * 0.02,   
        marginHorizontal: 16, 
    },
    buttonText: {
        fontSize: width * 0.045,
        color: '#FFF',    
    },
    listInputs: {
        flexDirection: 'column',
        rowGap: height * 0.015,
        paddingHorizontal: 16,
    },
    bottomText: {
        fontSize: width * 0.035,
        alignSelf: 'center',
        textAlign: 'center',
        marginHorizontal: width * 0.04,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: width * 0.035,
        marginBottom: 4,    
    },
    labelErrorText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});