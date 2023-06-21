import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { apiCall, clearAllAsync, getData, getFontSize } from '../../utils';
import { mainColors } from '../../colors';

function UserProfile(props) {

    const insets = useSafeAreaInsets();
    const [userData, setUserData] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

    const getUserProfileData = async () => {

        setShowLoader(true);
        let userLoginData = await getData('userLoginData');
        let token = userLoginData?.access;

        var options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        let response = await apiCall('account/profile/fetch_profile/' + userLoginData?.user?.profile_id + '/', options);
        setShowLoader(false);
        setUserData(response);

    }

    useEffect(() => {
        getUserProfileData();
    }, []);

    const logoutHandler = async () => {
        await clearAllAsync();
        props.navigation.replace('Login');
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <View style={{ height: insets.top, backgroundColor: mainColors.primaryButtonColor }}>
                <StatusBar
                    animated={true}
                    barStyle='light-content'
                    backgroundColor={mainColors.primaryButtonColor}
                />
            </View>
            <ScrollView>
                <View style={{ flex: 3 }}>
                    <View style={{
                        backgroundColor: mainColors.primaryButtonColor, padding: 50,
                        alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20
                    }}>
                        <Text style={[styles.textStyle, { color: mainColors.white, top: -20 }]}>
                            Profile
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('./../../images/dummy-profile-pic.png')} style={{
                            borderRadius: 50, top: -45,
                            borderColor: mainColors.white, borderWidth: 3
                        }} />
                    </View>
                </View>
                <View style={{ flex: 7, top: -40 }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.textStyle, { color: mainColors.textDarkGrey }]}>
                            {userData?.name}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                            <Text style={[styles.textStyle, { color: mainColors.textMediumGrey }]}>
                                Employee ID :
                            </Text>
                            <Text style={[styles.textStyle, { color: mainColors.textDarkGrey, marginLeft: 5 }]}>
                                {userData?.employee_id}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                            <Image source={require('./../../images/star-filled.png')} style={{ marginHorizontal: '1%' }} />
                            <Image source={require('./../../images/star-filled.png')} style={{ marginHorizontal: '1%' }} />
                            <Image source={require('./../../images/star-filled.png')} style={{ marginHorizontal: '1%' }} />
                            <Image source={require('./../../images/star-filled.png')} style={{ marginHorizontal: '1%' }} />
                            <Image source={require('./../../images/star-unfilled.png')} style={{ marginHorizontal: '1%' }} />
                        </View>
                    </View>
                    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <ActivityIndicator animating={showLoader} size="large" color={mainColors.primaryButtonColor} />
                    </View>
                    <View style={{ flex: 5, paddingHorizontal: 16, marginTop: 25 }}>
                        <View style={styles.singleProfileItem}>
                            <View style={styles.profileItemKey}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 400 }]}>
                                    Employment Type
                                </Text>
                            </View>
                            <View style={styles.profileItemValue}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemValueColor, fontWeight: 500, textAlign: 'right' }]}>
                                    {userData?.employee_type}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.singleProfileItem}>
                            <View style={styles.profileItemKey}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 400 }]}>
                                    Department
                                </Text>
                            </View>
                            <View style={styles.profileItemValue}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemValueColor, fontWeight: 500, textAlign: 'right' }]}>
                                    {userData?.department}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.singleProfileItem}>
                            <View style={styles.profileItemKey}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 400 }]}>
                                    Designation
                                </Text>
                            </View>
                            <View style={styles.profileItemValue}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemValueColor, fontWeight: 500, textAlign: 'right' }]}>
                                    {userData?.designation}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.singleProfileItem}>
                            <View style={styles.profileItemKey}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 400 }]}>
                                    Joining Date
                                </Text>
                            </View>
                            <View style={styles.profileItemValue}>
                                <Text style={[styles.textStyle, { color: mainColors.primaryButtonColor, fontWeight: 500, textAlign: 'right' }]}>
                                    {userData?.joining_date}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.singleProfileItem}>
                            <View style={styles.profileItemKey}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 400 }]}>
                                    Date of Birth
                                </Text>
                            </View>
                            <View style={styles.profileItemValue}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 500, textAlign: 'right' }]}>
                                    {userData?.dob}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.singleProfileItem}>
                            <View style={styles.profileItemKey}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 400 }]}>
                                    Phone Number
                                </Text>
                            </View>
                            <View style={styles.profileItemValue}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemValueColor, fontWeight: 500, textAlign: 'right' }]}>
                                    {userData?.phone}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.singleProfileItem}>
                            <View style={styles.profileItemKey}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 400 }]}>
                                    Email ID
                                </Text>
                            </View>
                            <View style={styles.profileItemValue}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemValueColor, fontWeight: 500, textAlign: 'right' }]}>
                                    {userData?.email}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.singleProfileItem}>
                            <View style={styles.profileItemKey}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 400 }]}>
                                    Appraisal Cycle
                                </Text>
                            </View>
                            <View style={styles.profileItemValue}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemValueColor, fontWeight: 500, textAlign: 'right' }]}>
                                    Yearly
                                </Text>
                            </View>
                        </View>
                        <View style={styles.singleProfileItem}>
                            <View style={styles.profileItemKey}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 400 }]}>
                                    Reporting Manager
                                </Text>
                            </View>
                            <View style={styles.profileItemValue}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemValueColor, fontWeight: 500, textAlign: 'right' }]}>
                                    {userData?.reporting_manager}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.singleProfileItem}>
                            <View style={styles.profileItemKey}>
                                <Text style={[styles.textStyle, { color: mainColors.profileItemKeyColor, fontWeight: 400 }]}>
                                    Shift Timings
                                </Text>
                            </View>
                            <View style={styles.profileItemValue}>
                                <Text style={[styles.textStyle, { color: mainColors.primaryButtonColor, fontWeight: 500, textAlign: 'right' }]}>
                                    {userData?.shift_timings?.start_time} - {userData?.shift_timings?.end_time}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                    <TouchableOpacity onPress={() => logoutHandler()} activeOpacity={1} style={{
                        width: '90%', borderRadius: 8, marginTop: '1%', padding: 15,
                        backgroundColor: mainColors.buttonRedColor, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: getFontSize(16), color: mainColors.white, fontWeight: 500,
                            fontFamily: 'Inter-Medium', textAlign: 'left'
                        }}>LOGOUT</Text>
                    </TouchableOpacity>
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
    },
    singleProfileItem: {
        flexDirection: 'row',
        borderBottomColor: mainColors.borderLineColors,
        borderBottomWidth: 2,
        paddingVertical: 10
    },
    profileItemKey: {
        flex: 1
    },
    profileItemValue: {
        flex: 1
    }
});

export default UserProfile;