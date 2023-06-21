import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { getFontSize } from '../../utils';
import { mainColors } from '../../colors';
import { LeavesRecordTabs } from '../../AppNavigations/TabNavigations/LeavesRecordTabs';

function LeaveRecords(props) {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: mainColors.white }}>
            <StatusBar
                animated={true}
                backgroundColor={mainColors.primaryButtonColor}
                barStyle={'dark-content'}
            />
            <View style={{ flexDirection: 'row', paddingHorizontal: 12, justifyContent: 'center', marginTop: 10 }}>
                <Text style={{
                    fontSize: getFontSize(16), color: mainColors.textBlackColor, fontWeight: 600,
                    fontFamily: 'Inter-Medium'
                }}>Leaves Record</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('ApplyLeave')} activeOpacity={1} style={{ position: 'absolute', right: '3%' }}>
                    <Image source={require('./../../images/add-icon-app-color.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={{ marginVertical: '2%', marginTop: '5%', flexDirection: 'row', paddingHorizontal: '5%', marginBottom: moderateScale(30) }}>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatedCircularProgress
                        size={80}
                        width={5}
                        fill={50}
                        tintColor={'#FF2828'}
                        backgroundColor={'#FFE9E9'}>
                        {(fill) => (<Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 700, color: '#292D32' }]}>
                            1/2
                        </Text>)}
                    </AnimatedCircularProgress>
                    <Text style={[styles.textStyle, { fontWeight: 400, color: mainColors.black, marginTop: moderateScale(8) }]}>
                        Full Day
                    </Text>
                </View>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatedCircularProgress
                        size={80}
                        width={5}
                        fill={50}
                        tintColor={'#41C2CB'}
                        backgroundColor={'#ECF9FA'}>
                        {(fill) => (<Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 700, color: '#292D32' }]}>
                            1/2
                        </Text>)}
                    </AnimatedCircularProgress>
                    <Text style={[styles.textStyle, { fontWeight: 400, color: mainColors.black, marginTop: moderateScale(8) }]}>
                        Half Day
                    </Text>
                </View>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatedCircularProgress
                        size={80}
                        width={5}
                        fill={65}
                        tintColor={'#735BF2'}
                        backgroundColor={'#F1EFFE'}>
                        {(fill) => (<Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 700, color: '#292D32' }]}>
                            0/2
                        </Text>)}
                    </AnimatedCircularProgress>
                    <Text style={[styles.textStyle, { fontWeight: 400, color: mainColors.black, marginTop: moderateScale(8) }]}>
                        Short Leave
                    </Text>
                </View>
            </View>
            <LeavesRecordTabs></LeavesRecordTabs>
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

export default LeaveRecords;