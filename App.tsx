import React from "react";
import RootNavigator from '@/app/index';
import { NavigationContainer } from "@react-navigation/native";
 // Импортируем провайдер контекста

const App = () => {
    return (
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
    );
};

export default App;
