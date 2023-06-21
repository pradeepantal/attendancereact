import React from 'react';
import { Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { getFontSize } from '../../../utils';
import { mainColors } from '../../../colors';
import { useNavigation } from '@react-navigation/native';

function SimpleButton(props) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={1} style={{
            width: '100%', borderRadius: 8, marginTop: '1%', padding: 15,
            backgroundColor: mainColors.primaryButtonColor, justifyContent: 'center', alignItems: 'center'
        }}>
            <Text style={{
                fontSize: getFontSize(16), color: mainColors.white, fontWeight: 500,
                fontFamily: 'Inter-Medium', textAlign: 'left'
            }}>{props.btnText}</Text>
        </TouchableOpacity>
    );
}

export default SimpleButton;