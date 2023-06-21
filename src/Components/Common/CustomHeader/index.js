import React from 'react';
import { Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { getFontSize } from '../../../utils';
import { mainColors } from '../../../colors';
import { useNavigation } from '@react-navigation/native';

function CustomHeader(props) {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 12, justifyContent: 'center', marginTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={{position: 'absolute', left: '1%'}}>
                <Image source={require('../../../images/back-icon.png')}></Image>
            </TouchableOpacity>
            <Text style={{
                fontSize: getFontSize(16), color: mainColors.textBlackColor, fontWeight: 600,
                fontFamily: 'Inter-Medium'
            }}>{props?.title}</Text>
        </SafeAreaView>
    );
}

export default CustomHeader;