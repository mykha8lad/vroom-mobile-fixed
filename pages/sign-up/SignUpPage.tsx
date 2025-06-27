import React, { useState, useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import { styles } from './SignUpPageStyles';
import { validateUsername } from '@/shared/validateTools/validateUsername';
import { validateEmail } from '@/shared/validateTools/validateEmail'; 
import { validatePassword } from '@/shared/validateTools/validatePasswors';
import { validateRepeatPassword } from '@/shared/validateTools/validateRepeatPassword';

import { UserNameForm } from '@/shared/ui/SignUpSignInForms/UserNameForm/UserNameForm';
import { EmailForm } from '@/shared/ui/SignUpSignInForms/EmailForm/EmailForm';
import { PasswordForm } from '@/shared/ui/SignUpSignInForms/PasswordForm/PasswordForm';
import { RepeatPasswordForm } from '@/shared/ui/SignUpSignInForms/RepeatPasswordForm/RepeatPasswordForm';
import { DateOfBirthForm } from '@/shared/ui/SignUpSignInForms/DateOfBirthForm/DateOfBirthForm';

import axios from 'axios';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';

export default function SignUpPage({ navigation }: { navigation: any }, width: any) {
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
        
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');  
    
    const [isFormValid, setIsFormValid] = useState(false);
    
    useEffect(() => {
        if (!userNameError && !emailError && !passwordError && !repeatPasswordError && userName && email && password && repeatPassword && selectedDate) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [userNameError, emailError, passwordError, repeatPasswordError, userName, email, password, repeatPassword, selectedDate]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date: any) => {
        const formattedDate = date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
        setSelectedDate(formattedDate);
        hideDatePicker();
    };

    const handleRegistration = async () => {        
        if (userNameError || emailError || passwordError || repeatPasswordError) {
            Alert.alert('Error', 'Please fix the errors before continuing.');
            return;
        } else if (!userName || !email || !password || !repeatPassword) {
            Alert.alert('Error', 'All fields must be filled.');
            return;
        }
    
        try {            
            const response = await axios.post('https://back.buhprogsoft.com.ua/api/Users/register', {
                userName,
                email,
                password,
                dateOfBirth: selectedDate,
            });
            console.log(response.status);
                        
            if (response.status === 200) {
                Alert.alert('Success', 'You have been registered successfully!');
                navigation.navigate('EmailConfirmation');
            }
        } catch (error: any) {
            if (error.response) {                
                if (error.response.status === 409) {
                    Alert.alert('Conflict', 'The email you entered is already registered. Please use a different one.');
                } else {                    
                    Alert.alert('Registration Error', error.response.data.message || 'An error occurred during registration.');
                }
            } else {                
                Alert.alert('Error', error.message || 'An unknown error occurred.');
            }
        }
    };
    

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#0EA2DE' barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />

        <View style={styles.arrowBack}>
            <TouchableOpacity onPress={() =>
                navigation.dispatch(
                CommonActions.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
                })
            )}>
                <Image
                    style={styles.arrowIcon}
                    source={require('@/assets/images/auth-images/arrow-back.png')}
                />
            </TouchableOpacity>
        </View>

        <View>
            <Text style={styles.header}>Sign up</Text>
        </View>

        <View>
            <View style={styles.listInputs}>                

                <UserNameForm userName={userName} userNameError={userNameError} 
                onChangeText={(text) => validateUsername(text, setUserNameError, setUserName)}/>

                <EmailForm email={email} emailError={emailError}
                onChangeText={(text) => validateEmail(text, setEmailError, setEmail)} />

                <PasswordForm password={password} passwordError={passwordError}
                onChangeText={(text) => validatePassword(text, setPasswordError, setPassword)} />

                <RepeatPasswordForm repeatPassword={repeatPassword} repeatPasswordError={repeatPasswordError}
                onChangeText={(text) => validateRepeatPassword(text, password, setRepeatPasswordError, setRepeatPassword)} />

                <DateOfBirthForm selectedDate={selectedDate} isVisible={isDatePickerVisible} onPress={showDatePicker} 
                onConfirm={handleConfirm} onCancel={hideDatePicker} />
                
            </View>
        </View>
        
        <TouchableOpacity
        disabled={!isFormValid}
        style={[styles.button, { backgroundColor: isFormValid ? '#0EA2DE' : '#E6E6E6' }]}
        onPress={handleRegistration}>
            <Text style={[styles.buttonText, { color: isFormValid ? '#FFF' : '#808080' }]}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
            Password must be 8-12 characters and contain both numbers and letters/special characters
        </Text>
    </SafeAreaView>
  );
}