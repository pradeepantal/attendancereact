import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { Calendar } from 'react-native-calendars';

import { getFontSize, getData, apiCall } from '../../utils';
import { mainColors } from '../../colors';

function CalendarScreen(props) {

    const [selected, setSelected] = useState('');
    const [calendarData, setCalendarData] = useState({});
    const [showLoader, setShowLoader] = useState(false);

    const getCalendarData = async () => {

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

        let response = await apiCall('employee/calendar-api/', options);        
        let newObj = {};

        setShowLoader(false);
        response?.map((item, index) => {
            if (item?.title !== '') {
                let newColor = '#' + Math.random().toString(16).substr(-6);
                newObj[item?.date] = { marked: true, dots: [{ key: index + 1, color: newColor, selectedDotColor: newColor }], title: item?.title, description: item?.description }
            }
        })

        setCalendarData(newObj);
        return;

    }

    useEffect(() => {
        getCalendarData();
    }, []);

    return (
        <SafeAreaView>
            <StatusBar
                backgroundColor={mainColors.white}
                barStyle={'dark-content'}
            />
            <ScrollView>
                <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                        props.navigation.navigate('UserInfoOnDate', { day: day })
                    }}
                    markedDates={Object.assign({}, { [selected]: { selected: true, disableTouchEvent: true, selectedColor: mainColors.primaryButtonColor } }, calendarData)}
                    markingType='multi-dot'
                />
                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <ActivityIndicator animating={showLoader} size="large" color={mainColors.primaryButtonColor} />
                </View>
                <View style={{ backgroundColor: mainColors.greyBg, padding: moderateScale(20), height: '100%' }}>
                    {
                        Object.keys(calendarData).length !== 0 && Object.values(calendarData)?.map((item) => {
                            return (
                                <View style={{ padding: moderateScale(10), borderLeftColor: item?.dots[0]?.color, borderLeftWidth: 1, backgroundColor: mainColors.white, marginBottom: moderateScale(20) }}>
                                    <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 600, color: '#222B45', marginBottom: '1%' }]}>
                                        {item?.title}
                                    </Text>
                                    <Text style={[styles.textStyle, { fontSize: moderateScale(16), fontWeight: 300, color: '#222B45', marginBottom: '1%' }]}>
                                        {item?.description}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
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

export default CalendarScreen;