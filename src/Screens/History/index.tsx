import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { mainColors } from '../../colors';

function History(props) {

    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor={mainColors.primaryButtonColor}
            />
        </SafeAreaView>
    );
}

const styles = ScaledSheet.create({

});

export default History;