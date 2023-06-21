import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../../Screens/Login';
import ApplyLeave from '../../../Screens/ApplyLeave';
import UserProfile from '../../../Screens/UserProfile';
import { MainTabNavigation } from '../../TabNavigations/MainTabNavigation';
import UserInfoOnDate from '../../../Screens/UserInfoOnDate';
import SelfieUpload from '../../../Screens/SelfieUpload';

const Stack = createNativeStackNavigator();

function MainStackNavigation() {
  return (
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainTabNavigation" component={MainTabNavigation} />
        <Stack.Screen name="ApplyLeave" component={ApplyLeave} />
        <Stack.Screen name="UserInfoOnDate" component={UserInfoOnDate} />
        <Stack.Screen name="SelfieUpload" component={SelfieUpload} />
      </Stack.Navigator>
  );
}

export default MainStackNavigation;