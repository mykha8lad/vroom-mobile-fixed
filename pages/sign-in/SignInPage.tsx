import { styles } from "./SignInPageStyles";
import React, { useState, useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseJwt } from "@/shared/utils/parseJwt";

import axios from 'axios';
import { useUserStore } from "@/shared/store/useUserStore";
import { useVideoStore } from "@/shared/store/useVideoStore";
import { useAuthStore } from "@/shared/store/authStore";

import { validateEmail } from "@/shared/validateTools/validateEmail";
import { validatePassword } from "@/shared/validateTools/validatePasswors";

import { EmailForm } from "@/shared/ui/SignUpSignInForms/EmailForm/EmailForm";
import { PasswordForm } from "@/shared/ui/SignUpSignInForms/PasswordForm/PasswordForm";

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

export default function SignInPage({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);

    const login = useAuthStore((state) => state.login);

    useEffect(() => {
            if (!emailError && !passwordError && email && password) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
    }, [emailError, passwordError, email, password]);    

    const handleLogin = async (email: string, password: string) => {
        const userVideos = useVideoStore.getState().userVideos;
        try {
            const { setUser, setToken } = useUserStore.getState();
        
            const response = await axios.post('https://back.buhprogsoft.com.ua/api/Auth/login', {
                email,
                password,
            });            
            
            const { token, email: userEmail, userName, id } = response.data;
        
            if (!token) {
                throw new Error('Токен не получен');
            }
        
            const decoded: any = parseJwt(token);
            console.log('Расшифрованный токен:', decoded);
        
            const user = {
                id: decoded?.sub || id || '',
                userName: decoded?.username || userName || '',
                email: decoded?.email || userEmail || email,
                avatar: decoded?.avatar || '',
                displayName: decoded?.displayname || '',
                videos: userVideos,
            };
        
            setUser(user);
            setToken(token);
        
            await AsyncStorage.setItem('user', JSON.stringify(user));
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userId', user.id);
        
            login();
        } catch (error: any) {
            if (error.response) {
                Alert.alert('Ошибка входа', error.response.data.message || 'Неверный email или пароль');
                console.log(error.response.data.message);
            } else {
                Alert.alert('Ошибка входа', error.message || 'Что-то пошло не так');
                console.log(error.message);
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

        <View style={{marginTop: 100}}>
            <View>
                <Text style={styles.header}>Log in</Text>
            </View>
        

            <View style={styles.formContainer}> 
                <View style={styles.listInputs}>
                    
                    <EmailForm email={email} emailError={emailError} 
                    onChangeText={(text) => validateEmail(text, setEmailError, setEmail)} />

                    <PasswordForm password={password} passwordError={passwordError} 
                    onChangeText={(text) => validatePassword(text, setPasswordError, setPassword)} />

                    <TouchableOpacity
                    disabled={!isFormValid}
                    style={[styles.button, { backgroundColor: isFormValid ? '#0EA2DE' : '#E6E6E6' }]}
                    onPress={() => {
                        if (!isFormValid) return;
                        handleLogin(email, password);
                    }}>
                        <Text style={[styles.buttonText, { color: isFormValid ? '#FFF' : '#808080' }]}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                                <Text style={styles.link}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>                    
            </View>

        </View>


      </SafeAreaView>
      
  );
}