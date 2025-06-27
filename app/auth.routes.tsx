import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomePage from '@/pages/welcome/WelcomePage';
import SignInPage from '@/pages/sign-in/SignInPage';
import SignUpPage from '@/pages/sign-up/SignUpPage';
import EmailConfirmationPage from '@/pages/email-confirmation/EmailConfirmationPage';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="EmailConfirmation" component={EmailConfirmationPage} />
    </Stack.Navigator>
);

export default AuthNavigator;