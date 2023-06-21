import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { moderateScale, ScaledSheet, verticalScale } from 'react-native-size-matters';

import { getFontSize } from '../../../utils';
import { mainColors } from '../../../colors';

function DataComponent(props) {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: mainColors.white, borderTopWidth: 0, paddingHorizontal: '5%', paddingVertical: verticalScale(20) }}>
            <View style={{marginTop: 10}}>
                <Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 500, color: mainColors.textLightGrey }]}>
                    June 2023
                </Text>
                <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 5,
                        height: 5,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 10,
                    backgroundColor: mainColors.white,
                    padding: 10,
                    marginTop: 10,
                    flexDirection: 'row',
                    borderRadius: 10
                }}>
                    <View style={{ flex: 7 }}>
                        <Text style={[styles.textStyle, { fontSize: moderateScale(12), fontWeight: 400, color: mainColors.textLightGrey, marginVertical: '1%' }]}>
                            Full Day Application
                        </Text>
                        <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 500, color: '#000000', marginVertical: '1%' }]}>
                            Wednesday,07 June
                        </Text>
                        <Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 500, color: '#FF2828', marginVertical: '1%' }]}>
                            Full day Leave
                        </Text>
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-end' }}>
                        <Image source={require('./../../../images/awaiting-img.png')} />
                    </View>
                </View>
            </View>
            <View style={{marginTop: 20}}>
                <Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 500, color: mainColors.textLightGrey }]}>
                    May 2023
                </Text>
                <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 5,
                        height: 5,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 10,
                    backgroundColor: mainColors.white,
                    padding: 10,
                    marginTop: 10,
                    flexDirection: 'row',
                    borderRadius: 10
                }}>
                    <View style={{ flex: 7 }}>
                        <Text style={[styles.textStyle, { fontSize: moderateScale(12), fontWeight: 400, color: mainColors.textLightGrey, marginVertical: '1%' }]}>
                        Half Day Application
                        </Text>
                        <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 500, color: '#000000', marginVertical: '1%' }]}>
                        Monday,04 May
                        </Text>
                        <Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 500, color: '#41C2CB', marginVertical: '1%' }]}>
                        Half Day Leave
                        </Text>
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-end' }}>
                        <Image source={require('./../../../images/approved-img.png')} />
                    </View>
                </View>
            </View>
            <View style={{marginTop: 20, paddingBottom: 50}}>
                <Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 500, color: mainColors.textLightGrey }]}>
                May 2023
                </Text>
                <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 5,
                        height: 5,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 10,
                    backgroundColor: mainColors.white,
                    padding: 10,
                    marginTop: 10,
                    flexDirection: 'row',
                    borderRadius: 10
                }}>
                    <View style={{ flex: 7 }}>
                        <Text style={[styles.textStyle, { fontSize: moderateScale(12), fontWeight: 400, color: mainColors.textLightGrey, marginVertical: '1%' }]}>
                        Short Day Application
                        </Text>
                        <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 500, color: '#000000', marginVertical: '1%' }]}>
                        Thursday,06 May
                        </Text>
                        <Text style={[styles.textStyle, { fontSize: moderateScale(14), fontWeight: 500, color: '#735BF2', marginVertical: '1%' }]}>
                        Short Leave
                        </Text>
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-end' }}>
                        <Image source={require('./../../../images/declined-img.png')} />
                    </View>
                </View>
            </View>
        </ScrollView>
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

export default DataComponent;