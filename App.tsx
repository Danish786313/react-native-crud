import React from 'react';
import {
  useColorScheme,
  ImageBackground
} from 'react-native';

//  components
import loginComponent from './src/components/login/login';
import DrawerNavigator from './src/components/drawerNavigator/drawerNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const localImage = require('./assets/images/background.png');

const Stack = createNativeStackNavigator();

export const AboutStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#0c040400',
                },
                headerTintColor: '#130b0b00',
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Login"
                component={loginComponent}
                options={{
                    title: 'Login',
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Todo List"
                component={DrawerNavigator}
                options={{
                    title: 'Todo List',
                }}
            />
        </Stack.Navigator>
    );
};

function App() {
    return (
        <SafeAreaProvider>
            <ImageBackground
                source={localImage}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
                <NavigationContainer>
                    <AboutStack />
                </NavigationContainer>
            </ImageBackground>
        </SafeAreaProvider>
    );
}


export default App;
