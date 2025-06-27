import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: width * 0.05,
  },
  formContainer: {    
    flexDirection: 'column',    
    rowGap: 20,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  listInputs: {
    flexDirection: 'column',    
    rowGap: 10,
    width: '100%',
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
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#0EA2DE',
    alignItems: 'center',
    justifyContent: 'center',    
  },
  buttonText: {
    fontSize: width * 0.04,
    color: '#FFF',
  },
  link: {
    color: '#808080',
    textDecorationLine: 'underline',
    fontSize: 14,
    textAlign: 'center',    
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#808080',
  },
  input: {
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 10,
    padding: 10,
    fontSize: width *   0.04,
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