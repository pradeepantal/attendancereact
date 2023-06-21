import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, Platform, PermissionsAndroid, Alert, ActivityIndicator } from 'react-native';
import { moderateScale, ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import SimpleGradientProgressbarView from "react-native-simple-gradient-progressbar-view";
import { useToast } from "react-native-toast-notifications";
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import { Stopwatch } from 'react-native-stopwatch-timer';
import moment from 'moment';

import { getFontSize, getData, apiCall } from '../../utils';
import { mainColors } from '../../colors';

function Home(props) {

    const insets = useSafeAreaInsets();
    const toast = useToast();
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [progressValue, setProgressValue] = useState(0);
    const [punchType, setPunchType] = useState('');
    const [timeElapsed, setTimeElapsed] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [loginUserName, setLoginUserName] = useState('');
    const [punchedIn, setPunchedIn] = useState(false);

    const stopWatchStyles = {
        container: {
            flex: 1,
            backgroundColor: 'transparent',
            padding: 5,
            borderRadius: 5,
            width: '100%',
            justifyContent: 'center',
            alignItem: 'center'
        },
        text: {
            fontSize: 30,
            color: '#fff',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: getFontSize(32),
            fontWeight: 800
        }
    }

    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState('...');
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState('...');
    const [
        locationStatus,
        setLocationStatus
    ] = useState('');

    useEffect(() => {
        // toast.show("You are in range click selfie for clocked in", {
        //     type: "success",
        //     placement: "bottom",
        //     duration: 4000,
        //     offset: 100,
        //     animationType: "slide-in"
        // });
        if (punchType == 'punch-in') {
            punchInUser();
        }
        else if (punchType == 'punch-out') {
            punchOutUser();
        }
        else {
            //  do nothing
        }

        getData('userLoginData').then((res) => {
            setLoginUserName(res?.user?.username);
        });
    }, [punchType]);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setPunchType('');
            const selfieUploaded = props?.route?.params?.selfieUploaded;
            if (selfieUploaded) {
                Alert.alert('User Punched in successfully');
                setIsStopwatchStart(true);
                setProgressValue(0.67);
                setPunchedIn(true);
                setPunchType('');
            }
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [props.navigation, props.route]);

    const punchInHandler = async () => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation('punch-in');
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    getOneTimeLocation('punch-in');
                } else {
                    setLocationStatus('Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }

    const punchOutHandler = async () => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation('punch-out');
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    getOneTimeLocation('punch-out');
                } else {
                    setLocationStatus('Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }

    const punchInUser = async () => {

        setShowLoader(true);
        let userLoginData = await getData('userLoginData');
        let token = userLoginData?.access;

        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'latitude': currentLatitude,
                'longitude': currentLongitude
            })
        }

        let response = await apiCall('employee/punch_in/', options);
        
        setShowLoader(false);
        if (response?.message == 'User punched in successfully') {
            setProgressValue(0.33);
            setCurrentLatitude('...');
            setCurrentLongitude('...');
            props.navigation.navigate('SelfieUpload');
        }
        else {
            setPunchType('');
            Alert.alert(response?.message);
            return;
        }
    }

    const punchOutUser = async () => {

        setShowLoader(true);
        let userLoginData = await getData('userLoginData');
        let token = userLoginData?.access;

        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'latitude': currentLatitude,
                'longitude': currentLongitude
            })
        }

        let response = await apiCall('employee/punch_out/', options);
        setShowLoader(false);
        if (response?.message == 'User punched out successfully') {
            Alert.alert(response?.message);
            setCurrentLatitude('...');
            setCurrentLongitude('...');
            setResetStopwatch(true);
            setPunchedIn(false);
            setPunchType('');
        }
        else {
            setPunchType('');
            Alert.alert(response?.message);
            return;
        }

    }

    const getOneTimeLocation = (punchType) => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                setLocationStatus('You are Here');

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Longitude state
                setCurrentLatitude(currentLatitude);

                setPunchType(punchType);

            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: mainColors.white }}>            
            <View style={{ height: insets.top, backgroundColor: mainColors.primaryButtonColor }}>
                <StatusBar
                    animated={true}
                    barStyle='light-content'
                    backgroundColor={mainColors.primaryButtonColor}
                />
            </View>
            <ScrollView>
                <View style={{ flex: 3, backgroundColor: mainColors.primaryButtonColor, padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            flex: 5, backgroundColor: mainColors.white, flexDirection: 'row', borderRadius: 20,
                            padding: 5, paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image source={require('./../../images/calendar-icon-home.png')} />
                            <Text style={[styles.textStyle, { fontWeight: 400, fontSize: 12, color: '#003538', marginLeft: 10, backgroundColor: mainColors.white }]}>
                                {moment().format('LLLL').slice(0, -8)}
                            </Text>
                        </View>
                        <View style={{ flex: 5, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Image source={require('./../../images/help-circle.png')} />
                        </View>
                    </View>
                    <View style={{ marginTop: '5%' }}>
                        <Text style={[styles.textStyle, { fontWeight: 400, color: '#003538', marginLeft: 10 }]}>
                            Good Morning {loginUserName}
                        </Text>
                    </View>
                    <View style={{ marginTop: '1%' }}>
                        <Text style={[styles.textStyle, { fontSize: moderateScale(24), color: mainColors.white, marginLeft: 10 }]}>
                            You are clocked {punchedIn == true ? 'in' : 'out'}
                        </Text>
                    </View>
                    <View style={{ marginTop: '2%', width: '100%' }}>
                        {/* <Text style={[styles.textStyle, {
                            fontSize: moderateScale(32), fontWeight: 800, color: mainColors.white,
                            marginLeft: 10, textAlign: 'center', marginTop: 20
                        }]}>
                            00:00 AM
                        </Text> */}
                        <Stopwatch
                            laps
                            start={isStopwatchStart}
                            // To start
                            reset={resetStopwatch}
                            options={stopWatchStyles}
                            // To reset
                            // Options for the styling
                            getTime={(time) => {
                                // console.log(time);
                                setTimeElapsed(time)
                            }}
                        />
                    </View>
                    <Image source={require('./../../images/hand-watch-img.png')} style={{ position: 'absolute', right: 5, top: '25%' }}></Image>
                </View>
                <View style={{ flex: 7, padding: moderateScale(24) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./../../images/home-step-1-img.png')}></Image>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./../../images/home-step-2-img.png')}></Image>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./../../images/home-step-3-img-completed.png')}></Image>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.textStyle, { fontSize: moderateScale(12), fontWeight: 400, marginTop: 3 }]}>
                                Range
                            </Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.textStyle, { fontSize: moderateScale(12), fontWeight: 400, marginTop: 3 }]}>
                                Selfie
                            </Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.textStyle, { fontSize: moderateScale(12), fontWeight: 400, marginTop: 3 }]}>
                                Marked
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', backgroundColor: '#EBEBEB', marginTop: 20, borderRadius: 7 }}>
                        <SimpleGradientProgressbarView
                            style={{ width: '100%', height: 10 }}
                            fromColor="#38A8AF"
                            toColor="#27617E"
                            progress={progressValue}
                            maskedCorners={[1, 1, 1, 1]}
                            cornerRadius={7.0}
                        />
                    </View>
                    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center' }}>
                        <ActivityIndicator animating={showLoader} size="large" color={mainColors.primaryButtonColor} />
                    </View>
                    <View>
                        <View style={{ padding: 10 }}>
                            <View style={{ flexDirection: 'row', marginVertical: '5%', justifyContent: 'space-between' }}>
                                <TouchableOpacity activeOpacity={1} onPress={() => punchInHandler()} style={{ width: scale(130), height: verticalScale(130), marginRight: moderateScale(8), borderRadius: 32 }}>
                                    <LinearGradient colors={['#FEF2E8', '#FEF2E8']} style={{
                                        width: '100%', height: '100%',
                                        borderRadius: 32, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Image source={require('./../../images/fingerprint-img.png')} />
                                        <Text style={[styles.textStyle, { fontSize: moderateScale(18), fontWeight: 400, color: '#BF8020' }]}>
                                            Punch In
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => punchOutHandler()} style={{ width: scale(130), height: verticalScale(130), marginLeft: moderateScale(10), borderRadius: 32 }}>
                                    <LinearGradient colors={['#F1F8EC', '#F1F8EC']} style={{
                                        width: '100%', height: '100%',
                                        borderRadius: 32, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Image source={require('./../../images/log-out-img.png')} />
                                        <Text style={[styles.textStyle, { fontSize: moderateScale(18), fontWeight: 400, color: '#37C23C' }]}>
                                            Punch Out
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: '5%', justifyContent: 'space-between' }}>
                                <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('ApplyLeave')} style={{ width: scale(130), height: verticalScale(130), marginRight: moderateScale(8), borderRadius: 32 }}>
                                    <LinearGradient colors={['#F2F0FE', '#F2F0FE']} style={{
                                        width: '100%', height: '100%',
                                        borderRadius: 32, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Image source={require('./../../images/apply-leave-img.png')} />
                                        <Text style={[styles.textStyle, { fontSize: moderateScale(18), fontWeight: 400, color: '#7B61FF' }]}>
                                            Apply Leave
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} disabled={timeElapsed == null || timeElapsed == '00:00:00'} onPress={() => setIsStopwatchStart(!isStopwatchStart)} style={{ width: scale(130), height: verticalScale(130), marginLeft: moderateScale(10), borderRadius: 32 }}>
                                    <LinearGradient colors={['#E3F7F9', '#E3F7F9']} style={{
                                        width: '100%', height: '100%',
                                        borderRadius: 32, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Image source={require('./../../images/coffee-icon.png')} />
                                        <Text style={[styles.textStyle, { fontSize: moderateScale(18), fontWeight: 400, color: '#38A8AF' }]}>
                                            On Break
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = ScaledSheet.create({
    textStyle: {
        fontFamily: 'Inter-Medium',
        fontSize: getFontSize(16),
        fontWeight: 600,
        color: mainColors.textBlackColor
    }
});

export default Home;