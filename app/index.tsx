import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from "react-native";
import AuthNavigator from './auth.routes';
import { useAuthStore } from '@/shared/store/authStore';
import AppNavigator from './app.routes';

const RootNavigator = () => {    
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated === undefined) {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        );
    }

    return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;

    return <AppNavigator />
};

export default RootNavigator;