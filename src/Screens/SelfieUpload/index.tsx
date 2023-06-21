import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, PermissionsAndroid, Platform, Alert, TouchableOpacity, Image, Text } from 'react-native';
import { scale, ScaledSheet, verticalScale, moderateScale } from 'react-native-size-matters';
import { launchCamera } from 'react-native-image-picker';

import { mainColors } from '../../colors';
import CustomHeader from '../../Components/Common/CustomHeader';
import { getFontSize } from '../../utils';

function SelfieUpload(props) {

    const [selectedImageData, setSelectedImageData] = useState({});

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {
        console.log('Working');

        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        if (isCameraPermitted) {
            launchCamera(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    Alert.alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    Alert.alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    Alert.alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    Alert.alert(response.errorMessage);
                    return;
                }

                setSelectedImageData(response?.assets[0]);
                props.navigation.navigate('MainTabNavigation', {screen : 'Home', params: {selfieUploaded: true}});
            });
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: mainColors.white }}>
            <StatusBar
                animated={true}
                backgroundColor={mainColors.primaryButtonColor}
                barStyle={'dark-content'}
            />
            <View style={{ backgroundColor: mainColors.white, height: '100%' }}>
                <View style={{ paddingHorizontal: '5%' }}>
                    <CustomHeader title={'Clock In'}></CustomHeader>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: '30%' }}
                    onPress={() => captureImage('photo')}>
                    {
                        Object.keys(selectedImageData).length ?
                            <Image
                                source={{ uri: selectedImageData?.uri }}
                                style={{ borderRadius: 200, width: scale(250), height: scale(250), borderWidth: 5, borderColor: '#29B612' }}
                            /> :
                            <Image
                                source={require('./../../images/dummy-face-img.png')}
                                style={{ borderRadius: 200, width: scale(250), height: scale(250), borderWidth: 5, borderColor: '#29B612' }}
                            />
                    }
                </TouchableOpacity>
                <View style={{ marginTop: '10%', justifyContent: 'center', alignItems: 'center', maxWidth: '80%', alignSelf: 'center' }}>
                    <Text style={[styles.textStyle, { fontSize: moderateScale(18), fontWeight: 600, color: '#000000' }]}>
                        Verify to clock in
                    </Text>
                    <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 400, color: '#8F9BB3', textAlign: 'center', marginTop: '3%' }]}>
                        Make sure your head is in the circle
                        while we scan your face
                    </Text>
                </View>
            </View>
        </SafeAreaView>
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

export default SelfieUpload;