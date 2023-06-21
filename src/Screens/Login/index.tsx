import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, SafeAreaView, Image, TextInput, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

import { getFontSize, storeData, apiCall, getData } from '../../utils';
import { mainColors } from '../../colors';
import SimpleButton from '../../Components/Common/SimpleButton';

function Login({ navigation }) {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const employeeIdRef = React.useRef();
  const passwordRef = React.useRef();

  const loginHandler = async () => {
    if (employeeId == '' || password == '') {
      Alert.alert('Parameter Missing');
      return;
    }

    setShowLoader(true);

    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'employee_id': employeeId,
        'password': password
      })
    }

    let response = await apiCall('account/employee-token/', options);

    setShowLoader(false);

    if (response?.success == true) {
      storeData('userLoginData', response);
      employeeIdRef.current.value == '';
      passwordRef.current.value == '';
      setEmployeeId('');
      setPassword('');
      navigation.replace('MainTabNavigation');
    }
    else if (response?.employee_id) {
      Alert.alert(response.employee_id[0]);
      return;
    }
    else {
      Alert.alert(response?.password[0]);
      return;
    }

  }

  const getLoginStatus = async () => {
    let userLoginData = await getData('userLoginData');
    let token;
    if (userLoginData != null) {
      token = userLoginData?.access;
    }
    else {
      token = null;
    }

    return token;
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLoginStatus().then((response) => {
        if (response !== null) {
          navigation.replace('MainTabNavigation');
        }
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColors.white }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: mainColors.white, paddingBottom: 10 }}>
        <ScrollView style={{ flex: 1, backgroundColor: mainColors.white }}>
          <View style={styles.upperPortionStyles}>
            <Text style={{
              fontSize: getFontSize(16), color: mainColors.textBlackColor, fontWeight: 600,
              fontFamily: 'Inter-Medium', marginBottom: '5%'
            }}>Login</Text>
            <Image source={require('../../images/login-logo-img.png')}></Image>
            <Text style={{
              fontSize: getFontSize(18), color: mainColors.textBlackColor, fontWeight: 600,
              fontFamily: 'Inter-Medium', marginTop: '7%'
            }}>Welcome & mark your presence!</Text>
            <Text style={{
              fontSize: getFontSize(16), color: mainColors.textLightgrey, fontWeight: 400,
              fontFamily: 'Inter-Medium', marginTop: '2%', maxWidth: '70%', textAlign: 'center'
            }}>Enter your Employee ID and
              Password for sign in.</Text>
          </View>
          <View style={styles.lowerPortionStyles}>
            <View style={{ marginTop: '8%' }}>
              <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <ActivityIndicator animating={showLoader} size="large" color={mainColors.primaryButtonColor} />
              </View>
              <Text style={{
                fontSize: getFontSize(14), color: mainColors.textDarkGrey, fontWeight: 500,
                fontFamily: 'Inter-Medium', textAlign: 'left'
              }}>Employee ID</Text>
              <View>
                <Image style={{ position: 'absolute', top: '30%', left: '3%' }} source={require('../../images/user-icon.png')}></Image>
                <TextInput
                  value={employeeId}
                  style={styles.inputBox}
                  onChangeText={(text) => setEmployeeId(text)}
                  placeholder="Enter Employee ID"
                  placeholderTextColor={mainColors.inputPlaceholderColor}
                  ref={employeeIdRef}>
                </TextInput>
                <Image style={{ position: 'absolute', top: '35%', right: '5%' }} source={require('../../images/help-icon.png')}></Image>
              </View>
            </View>
            <View style={{ marginTop: '3%' }}>
              <Text
                style={{
                  fontSize: getFontSize(14), color: mainColors.textDarkGrey, fontWeight: 500,
                  fontFamily: 'Inter-Medium', textAlign: 'left'
                }}>Password</Text>
              <View>
                <Image style={{ position: 'absolute', top: '30%', left: '3%' }} source={require('../../images/user-icon.png')}></Image>
                <TextInput
                  value={password}
                  style={styles.inputBox}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Enter Password"
                  placeholderTextColor={mainColors.inputPlaceholderColor}
                  secureTextEntry={!showPassword}
                  ref={passwordRef}>
                </TextInput>
                <TouchableOpacity hitSlop={5} style={{ position: 'absolute', top: '35%', right: '5%' }} activeOpacity={1} onPress={() => setShowPassword(!showPassword)}>
                  <Image source={require('../../images/eye-icon.png')}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: '15%' }}>
              <SimpleButton btnText={'Login'} onPress={() => loginHandler()}></SimpleButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  upperPortionStyles: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(9),
    alignItems: 'center',
    justifyContent: 'center'
  },
  lowerPortionStyles: {
    flex: 5,
    paddingHorizontal: moderateScale(16)
  },
  inputBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(10),
    borderRadius: 5,
    paddingHorizontal: moderateScale(40),
    borderColor: mainColors.lightGreyBorder,
    borderWidth: 1,
    marginVertical: '3%'
  }
});

export default Login;