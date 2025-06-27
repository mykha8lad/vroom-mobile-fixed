import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',    
    },
    header: {
        backgroundColor: '#0EA2DE',
        paddingTop: Platform.OS === 'android' ? 30 : 50,
        alignItems: 'center',
    },
    headerContent: {
        alignItems: 'center',
        justifyContent: 'space-between',
        rowGap: height * 0.04,
    },
    headerText: {
        color: '#FFF',
        fontSize: width * 0.05,
        textAlign: 'center',    
    },
    headerImage: {    
        height: height * 0.3,
        width: width * 0.8,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    bodyContent: {
        width: '100%',
        rowGap: 20,
    },
    sectionTitle: {
        fontSize: width * 0.05,
        textAlign: 'center',
    },
    button: {
        borderRadius: 10,
        width: '100%',
        paddingVertical: height * 0.015,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
    },
    buttonText: {
        fontSize: width * 0.04,
        color: '#FFF',
    },
    iconContainer: {
        position: 'absolute',
        left: width * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: width * 0.05,
        height: width * 0.05,
    },
    link: {
        color: '#0EA2DE',
        textDecorationLine: 'underline',
        fontSize: 14,
        textAlign: 'center',    
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',    
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#808080',
    },
    lineText: {
        marginHorizontal: width * 0.02,
        color: '#000',
        fontSize: width * 0.035,
    },
});