import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,    
  },
  formContainer: {
    marginHorizontal: 8,
    marginTop: 100,
    padding: 12,
    flexDirection: 'column',
    rowGap: 20,
    alignItems: 'center',
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
  button: {
    borderRadius: 10,
    width: '60%',
    paddingVertical: 11,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',        
  },
  buttonText: {
    fontSize: 16,
    color: '#808080',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 244,
  },
  inputBox: {
    width: 34,
    height: 44,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  link: {
    color: '#808080',
    textDecorationLine: 'underline',
    fontSize: 16,
    textAlign: 'center',    
  },
});
