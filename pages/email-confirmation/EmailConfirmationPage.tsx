import React, { useState, useRef, useEffect } from 'react';
import { styles } from './EmailConfirmationPageStyles';
import {
  View,
  Text,
  Image,
  TouchableOpacity, 
  StatusBar,
  SafeAreaView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';

export default function EmailConfirmationPage({ navigation }: { navigation: any }) {  
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isFormValid, setIsFormValid] = useState(false);
    const inputs = Array.from({ length: 6 }, () => useRef<TextInput>(null));

    useEffect(() => {
        const isCodeComplete = code.every((digit) => digit !== '');
        setIsFormValid(isCodeComplete);
    }, [code]);

    const handleInputChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;

        setCode(newCode);
        
        if (text && index < inputs.length - 1) {
        inputs[index + 1].current?.focus();
        }
    };

    const handleKeyPress = (event: any, index: number) => {
        if (event.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
        inputs[index - 1].current?.focus();
        }
    };

    const isCodeComplete = code.every((digit) => digit !== '');
    
    const handleSubmit = async () => {
        if (!isFormValid && !isCodeComplete) {
            Alert.alert('Ошибка', 'Введите полный код.');
            return;
        }

        const verificationCode = code.join('');

        try {            
            if(verificationCode === '123456')  {
                Alert.alert('Код подтвержден', 'Теперь вы можете войти в аккаунт.')
                navigation.navigate('SignIn')
            } else {
                
            }    
        } catch (error: any) {
            Alert.alert('Ошибка', 'Неверный код.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#0EA2DE' barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />

        <View style={styles.arrowBack}>
            <TouchableOpacity>
            <Image
                style={styles.arrowIcon}
                source={require('@/assets/images/auth-images/arrow-back.png')}
            />
            </TouchableOpacity>
        </View>

            <View style={styles.formContainer}>            
                    <View><Text style={{fontSize: 20}}>Confirm your email</Text></View>

                    <Text style={{fontSize: 14, color: '#808080', textAlign: 'center'}}>Validate your email via 6-digit code we have sent you</Text>
                    
                    <View style={styles.inputRow}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={inputs[index]}
                                value={digit}
                                onChangeText={(text) => handleInputChange(text, index)}
                                onKeyPress={(event) => handleKeyPress(event, index)}
                                style={styles.inputBox}
                                keyboardType='numeric'
                                maxLength={1}
                            />
                        ))}
                    </View>
                    
                    <TouchableOpacity>
                        <Text style={styles.link}>Resend code</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                    disabled={!isFormValid}
                    style={[styles.button, 
                        {backgroundColor: isFormValid ? '#0EA2DE' : '#E6E6E6'}
                    ]} onPress={handleSubmit}>
                        <Text style={[styles.buttonText,
                            {color: isFormValid ? '#FFF' : '#808080'}
                        ]}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                    
            </View>

        </SafeAreaView>
        
    );
}