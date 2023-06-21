/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  useColorScheme,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './src/AppNavigations/StackNavigations/MainStackNavigation';
import SplashScreen from "react-native-splash-screen"; //import SplashScreen
import { ToastProvider } from 'react-native-toast-notifications'

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [hideSplash, setHideSplash] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplash(true);
    }, 3000); // amount of time the splash is shown from the time component is rendered
  }, []);

  React.useEffect(() => {
    hideSplash && SplashScreen.hide();
  }, [hideSplash]);

  return (
    <ToastProvider offsetBottom={70} successColor="#37C23C"
                    style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <NavigationContainer>
        <MainStackNavigation></MainStackNavigation>
      </NavigationContainer>
    </ToastProvider>
  );
}

export default App;
