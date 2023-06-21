import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { getFontSize } from '../../utils';
import { mainColors } from '../../colors';
import CustomHeader from '../../Components/Common/CustomHeader';

function UserInfoOnDate(props) {

    const [headerTitle, setHeaderTitle] = useState('');

    useEffect(() => {
        let monthNumber = props?.route?.params?.day?.month;
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var title = props?.route?.params?.day?.day + ',' + monthNames[parseInt(monthNumber) - 1] + ',' + props?.route?.params?.day?.year;
        setHeaderTitle(title);
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: mainColors.white }}>
            <StatusBar
                animated={true}
                backgroundColor={mainColors.primaryButtonColor}
                barStyle={'dark-content'}
            />
            <ScrollView style={{ backgroundColor: mainColors.white, height: '100%' }}>
                <View style={{paddingHorizontal: '5%'}}>
                    <CustomHeader title={headerTitle}/>
                </View>
                <View style={{ flex: 4, alignItems: 'center', marginTop: 20, paddingHorizontal: '5%', }}>
                    <View style={{
                        width: '100%',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 10,
                            height: 10,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 3.84,
                        elevation: 1,
                        backgroundColor: mainColors.white,
                        borderRadius: 16,
                        padding: moderateScale(16),
                        flex: 1,
                        marginBottom: 20
                    }}>
                        <View style={{ borderBottomColor: '#E0E0E0', borderBottomWidth: 2 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 3 }}>
                                    <Text style={[styles.textStyle, { fontSize: moderateScale(11), fontWeight: 400, color: '#8F9BB3' }]}>
                                        06,June,2023
                                    </Text>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text style={[styles.textStyle, { fontSize: moderateScale(11), fontWeight: 400, color: '#8F9BB3', textAlign: 'center' }]}>
                                        In & Out
                                    </Text>
                                </View>
                                <View style={{ flex: 3 }}>

                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                <View style={{ flex: 3 }}>
                                    <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 500, color: '#222B45' }]}>
                                        09:10 total hrs
                                    </Text>
                                </View>
                                <View style={{ flex: 5 }}>
                                    <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 500, color: '#222B45', textAlign: 'center' }]}>
                                        10:00 AM .... 07:00 AM
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ borderRadius: 50, width: scale(7), height: verticalScale(7), backgroundColor: '#00B383', marginRight: '3%' }} />
                                    <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 400, color: '#222B45' }]}>
                                        Number of working days
                                    </Text>
                                </View>
                                <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 700, color: '#222B45' }]}>
                                    26
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '8%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ borderRadius: 50, width: scale(7), height: verticalScale(7), backgroundColor: '#0095FF', marginRight: '3%' }} />
                                    <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 400, color: '#222B45' }]}>
                                        Number of Holidays
                                    </Text>
                                </View>
                                <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 700, color: '#222B45' }]}>
                                    2
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '8%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ borderRadius: 50, width: scale(7), height: verticalScale(7), backgroundColor: '#FF2828', marginRight: '3%' }} />
                                    <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 400, color: '#222B45' }]}>
                                        Number of Leaves taken
                                    </Text>
                                </View>
                                <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 700, color: '#222B45' }]}>
                                    2
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <LinearGradient colors={['#38A8AF', '#126F75']} style={{
                    width: '100%', height: '100%', flex: 6, paddingTop: '20%', paddingBottom: '40%'
                    , top: -70, zIndex: -1, paddingHorizontal: '5%'
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '5%' }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={[styles.textStyle, { color: mainColors.white }]}>
                                Productivity
                            </Text>
                            <Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 400, color: mainColors.white }]}>
                                9 Hour 10 Minutes
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AnimatedCircularProgress
                                size={60}
                                width={5}
                                fill={85}
                                tintColor={mainColors.white}
                                // onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor={'#59AFB5'}>
                                {(fill) => (<Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 700, color: mainColors.white }]}>
                                    85%
                                </Text>)}
                            </AnimatedCircularProgress>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '5%' }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={[styles.textStyle, { color: mainColors.white }]}>
                                Effectiveness
                            </Text>
                            <Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 400, color: mainColors.white }]}>
                                9 Hour 10 Minutes
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AnimatedCircularProgress
                                size={60}
                                width={5}
                                fill={65}
                                tintColor={mainColors.white}
                                // onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor={'#59AFB5'}>
                                {(fill) => (<Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 700, color: mainColors.white }]}>
                                    65%
                                </Text>)}
                            </AnimatedCircularProgress>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={[styles.textStyle, { color: mainColors.white }]}>
                                Project Completed
                            </Text>
                            <Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 400, color: mainColors.white }]}>
                                6 Hour 45 Minutes
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AnimatedCircularProgress
                                size={60}
                                width={5}
                                fill={65}
                                tintColor={mainColors.white}
                                backgroundColor={'#59AFB5'}>
                                {(fill) => (<Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 700, color: mainColors.white }]}>
                                    65%
                                </Text>)}
                            </AnimatedCircularProgress>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
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

export default UserInfoOnDate;