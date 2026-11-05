import React from 'react';
import {
  useColorScheme
} from 'react-native';

//  components
import loginComponent from './src/components/login/login';
import DrawerNavigator from './src/components/drawerNavigator/drawerNavigator';
import MyTabs from './src/components/tabNavigator/tabNavigator';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AboutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9295D2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Login" component={loginComponent}
        options={{
          title: "Login"
        }}
      />

      <Stack.Screen name="Todo List" component={DrawerNavigator}
        options={{
          title: "Todo List"
        }}
      />

    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      {/* <DrawerNavigator /> */}
      {/* <SafeAreaProvider> */}
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <NavigationContainer>
        <AboutStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;
