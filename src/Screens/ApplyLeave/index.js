import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';

import { getFontSize } from '../../utils';
import { mainColors } from '../../colors';
import CustomHeader from '../../Components/Common/CustomHeader';
import SimpleButton from '../../Components/Common/SimpleButton';

function ApplyLeave(props) {

    const leaveTypeOptions = ["Short-Leave", "Half-Day", "Full-Day"];
    const timeSlotOptionsHalfDay = ["first-half", "second-half"]
    const timeSlotOptionsShortLeave = ["first-quarter", "second-quarter", "third-quarter", "fourth-quarter"]
    const [selectedLeaveType, setSelectedLeaveType] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [datePickerVisible, setDatePickerVisibility] = useState(false)
    const [startDatePickerVisible, setStartDatePickerVisibility] = useState(false)
    const [endDatePickerVisible, setEndDatePickerVisibility] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: mainColors.white, paddingTop: Platform.OS == 'android' ? 30 : 0 }}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: mainColors.white }}>
                <ScrollView style={{ paddingHorizontal: '5%' }}>
                    <CustomHeader title={'Apply Leave'}></CustomHeader>
                    <View style={{ flex: 9, marginTop: 30 }}>
                        <View>
                            <Text style={{
                                fontSize: getFontSize(14), color: mainColors.textDarkGrey, fontWeight: 500,
                                fontFamily: 'Inter-Medium', textAlign: 'left', marginBottom: '3%'
                            }}>Leave Type*</Text>
                            <SelectDropdown
                                buttonStyle={{
                                    width: '100%', backgroundColor: mainColors.white, borderColor: mainColors.lightGreyBorder,
                                    borderRadius: 8, borderWidth: 1
                                }}
                                buttonTextStyle={{ textAlign: 'left', color: mainColors.inputPlaceholderColor }}
                                data={leaveTypeOptions}
                                onSelect={(selectedItem, index) => {
                                    setSelectedLeaveType(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                            />
                            <Image style={{ position: 'absolute', top: '60%', right: '5%' }} source={require('../../images/down-arrow.png')}></Image>
                        </View>
                        {selectedLeaveType !== 'Full-Day' &&
                            <View style={{ marginTop: '3%' }}>
                                <Text style={{
                                    fontSize: getFontSize(14), color: mainColors.textDarkGrey, fontWeight: 500,
                                    fontFamily: 'Inter-Medium', textAlign: 'left'
                                }}>Date*</Text>
                                <View>
                                    <Pressable onPress={() => setDatePickerVisibility(true)}>
                                        <View pointerEvents="none">
                                            <TextInput
                                                style={styles.inputBox}
                                                onChangeText={(text) => setSelectedDate(text)}
                                                placeholder={"Select date"}
                                                placeholderTextColor={mainColors.inputPlaceholderColor}
                                                value={selectedDate.toDateString()}>
                                            </TextInput>
                                        </View>
                                    </Pressable>
                                    <Image style={{ position: 'absolute', top: '35%', right: '5%' }} source={require('../../images/calendar-icon.png')}></Image>
                                </View>
                            </View>
                        }
                        {
                            selectedLeaveType == 'Full-Day' &&
                            (
                                <View>
                                    <View style={{ marginTop: '3%' }}>
                                        <Text style={{
                                            fontSize: getFontSize(14), color: mainColors.textDarkGrey, fontWeight: 500,
                                            fontFamily: 'Inter-Medium', textAlign: 'left'
                                        }}>Start Date*</Text>
                                        <View>
                                            <Pressable onPress={() => setStartDatePickerVisibility(true)}>
                                                <View pointerEvents="none">
                                                    <TextInput
                                                        style={styles.inputBox}
                                                        onChangeText={(text) => setSelectedStartDate(text)}
                                                        placeholder={"Select start date"}
                                                        placeholderTextColor={mainColors.inputPlaceholderColor}
                                                        value={selectedStartDate.toDateString()}>
                                                    </TextInput>
                                                </View>
                                            </Pressable>
                                            <Image style={{ position: 'absolute', top: '35%', right: '5%' }} source={require('../../images/calendar-icon.png')}></Image>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: '3%' }}>
                                        <Text style={{
                                            fontSize: getFontSize(14), color: mainColors.textDarkGrey, fontWeight: 500,
                                            fontFamily: 'Inter-Medium', textAlign: 'left'
                                        }}>End Date*</Text>
                                        <View>
                                            <Pressable onPress={() => setEndDatePickerVisibility(true)}>
                                                <View pointerEvents="none">
                                                    <TextInput
                                                        style={styles.inputBox}
                                                        onChangeText={(text) => setSelectedEndDate(text)}
                                                        placeholder={"Select start date"}
                                                        placeholderTextColor={mainColors.inputPlaceholderColor}
                                                        value={selectedEndDate.toDateString()}>
                                                    </TextInput>
                                                </View>
                                            </Pressable>
                                            <Image style={{ position: 'absolute', top: '35%', right: '5%' }} source={require('../../images/calendar-icon.png')}></Image>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                        {
                            !(selectedLeaveType == 'Full-Day' || selectedLeaveType == '') &&
                            <View style={{ marginTop: '3%' }}>
                                <Text style={{
                                    fontSize: getFontSize(14), color: mainColors.textDarkGrey, fontWeight: 500,
                                    fontFamily: 'Inter-Medium', textAlign: 'left', marginBottom: '3%'
                                }}>Time Slot*</Text>
                                <SelectDropdown
                                    buttonStyle={{
                                        width: '100%', backgroundColor: mainColors.white, borderColor: mainColors.lightGreyBorder,
                                        borderRadius: 8, borderWidth: 1
                                    }}
                                    buttonTextStyle={{ textAlign: 'left', color: mainColors.inputPlaceholderColor }}
                                    data={selectedLeaveType == 'Half-Day' ? timeSlotOptionsHalfDay : timeSlotOptionsShortLeave}
                                    onSelect={(selectedItem, index) => {
                                        setSelectedTimeSlot(selectedItem);
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            </View>
                        }
                        <View style={{ marginTop: '3%' }}>
                            <Text style={{
                                fontSize: getFontSize(14), color: mainColors.textDarkGrey, fontWeight: 500,
                                fontFamily: 'Inter-Medium', textAlign: 'left'
                            }}>Subject*</Text>
                            <View>
                                <TextInput
                                    style={[styles.inputBox, { height: Platform.OS === 'ios' ? 80 : 100, paddingTop: Platform.OS === 'ios' ? 15 : 5, justifyContent: 'flex-start', alignItems: 'flex-start' }]}
                                    onChangeText={(text) => setSubject(text)}
                                    placeholder="Enter Subject of your email"
                                    placeholderTextColor={mainColors.inputPlaceholderColor}
                                    multiline={true}
                                    scrollEnabled={false}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={{ marginTop: '3%' }}>
                            <Text style={{
                                fontSize: getFontSize(14), color: mainColors.textDarkGrey, fontWeight: 500,
                                fontFamily: 'Inter-Medium', textAlign: 'left'
                            }}>Description*</Text>
                            <View>
                                <TextInput
                                    style={[styles.inputBox, { height: Platform.OS === 'ios' ? 80 : 100, paddingTop: Platform.OS === 'ios' ? 15 : 5, justifyContent: 'flex-start', alignItems: 'flex-start' }]}
                                    onChangeText={(text) => setDescription(text)}
                                    placeholder="Enter Reason of your leave"
                                    placeholderTextColor={mainColors.inputPlaceholderColor}
                                    multiline={true}
                                    scrollEnabled={false}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={{ paddingBottom: 50 }}>
                            <Text style={{
                                fontSize: getFontSize(16), color: mainColors.textBlackColor, fontWeight: 600,
                                fontFamily: 'Inter-Medium', marginVertical: '7%'
                            }}>Attach Supportive Documents</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('ApplyLeave')} activeOpacity={1} style={{
                                width: '100%', borderRadius: 8, marginTop: '3%', padding: 15, borderColor: mainColors.primaryButtonColor,
                                borderWidth: 1, borderStyle: 'dashed', flexDirection: 'row',
                                backgroundColor: mainColors.appLightGreen, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image style={{ marginHorizontal: '1%' }} source={require('../../images/add-icon.png')}></Image>
                                <Text style={{
                                    fontSize: getFontSize(16), color: mainColors.primaryButtonColor, fontWeight: 500,
                                    fontFamily: 'Inter-Medium', textAlign: 'left'
                                }}>ATTACH DOCUMENT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={{
                    paddingVertical: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: -10,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 3.84,
                    elevation: 10,
                    backgroundColor: mainColors.white,
                    alignItems: 'center',
                    zIndex: 999
                }}>
                    <View style={{ width: '90%' }}>
                        <SimpleButton btnText={'Apply Leave'} route={'goBack'}></SimpleButton>
                    </View>
                </View>
                <DatePicker
                    modal
                    open={datePickerVisible}
                    date={new Date()}
                    onConfirm={(date) => {
                        setDatePickerVisibility(false)
                        setSelectedDate(date)
                    }}
                    onCancel={() => {
                        setDatePickerVisibility(false)
                    }}
                    mode={'date'}
                />
                <DatePicker
                    modal
                    open={startDatePickerVisible}
                    date={new Date()}
                    onConfirm={(date) => {
                        setStartDatePickerVisibility(false)
                        setSelectedStartDate(date)
                    }}
                    onCancel={() => {
                        setStartDatePickerVisibility(false)
                    }}
                    mode={'date'}
                />
                <DatePicker
                    modal
                    open={endDatePickerVisible}
                    date={new Date()}
                    onConfirm={(date) => {
                        setEndDatePickerVisibility(false)
                        setSelectedEndDate(date)
                    }}
                    onCancel={() => {
                        setEndDatePickerVisibility(false)
                    }}
                    mode={'date'}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = ScaledSheet.create({
    inputBox: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(10),
        borderRadius: 5,
        paddingHorizontal: moderateScale(20),
        paddingRight: moderateScale(40),
        borderColor: mainColors.lightGreyBorder,
        borderWidth: 1,
        marginVertical: '3%'
    }
});

export default ApplyLeave;