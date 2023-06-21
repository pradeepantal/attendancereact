import {Image} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { mainColors } from '../../../colors';
import { getFontSize } from '../../../utils';
import DataComponent from '../../../Screens/LeavesRecord/DataComponent';
import { scale, verticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export function LeavesRecordTabs() {

    const isFocused = useIsFocused();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconSource;

                if (route.name === 'Full Day') {
                    iconSource = require('./../../../images/red-dot.png');
                } 
                else if (route.name === 'Half Day') {
                    iconSource = require('../../../images/green-dot.png');
                }
                else {
                    iconSource = require('../../../images/purple-dot.png');
                }

                return <Image source={iconSource} style={{top: verticalScale(7)}}></Image>
            },
            tabBarStyle: {
                justifyContent: 'center',
                borderBottomWidth: 0,
                borderWidth: 0,
                shadowOpacity: 0
            }, 
            tabBarIndicatorStyle: {
                backgroundColor: mainColors.white
            },
            tabBarContentContainerStyle: {
                height: 45,
                marginHorizontal: '4%',
                margin: 'auto',
                backgroundColor: mainColors.lightGreyBorder,
                borderBottomWidth: 0,
                borderRadius: 10,
                justifyContent: 'center',
                borderWidth: 0
            },
            tabBarItemStyle: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderRadius: 10,
                width: scale(110)
            },
            tabBarActiveTintColor: mainColors.white,
            tabBarInactiveTintColor: mainColors.black,
            tabBarLabelStyle: {
                fontSize: getFontSize(12),
                fontWeight: 600,
                fontFamily: 'Inter-Medium'
            }
        })}>
            <Tab.Screen name="Full Day" component={DataComponent} />
            <Tab.Screen name="Half Day" component={DataComponent} />
            <Tab.Screen name="Short Leave" component={DataComponent} />
        </Tab.Navigator>
    );
} 