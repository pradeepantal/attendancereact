import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../Screens/Home';
import UserProfile from '../../../Screens/UserProfile';
import { mainColors } from '../../../colors';
import { getFontSize } from '../../../utils';
import { useIsFocused } from "@react-navigation/native";
import History from '../../../Screens/History';
import CalendarScreen from '../../../Screens/Calendar';
import LeavesRecord from '../../../Screens/LeavesRecord';

const Tab = createBottomTabNavigator();

export function MainTabNavigation() {

    const isFocused = useIsFocused();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconSource;

                if (route.name === 'Home') {
                    iconSource = focused
                        ? require('./../../../images/TabBar/home-icon-active.png')
                        : require('./../../../images/TabBar/home-icon-inactive.png');
                } 
                else if (route.name === 'User') {
                    iconSource = focused
                    ? require('./../../../images/TabBar/profile-icon-active.png')
                    : require('../../../images/TabBar/profile-icon-inactive.png');
                }
                else if (route.name === 'Calendar') {
                    iconSource = focused
                    ? require('./../../../images/TabBar/calendar-icon-active.png')
                    : require('../../../images/TabBar/calendar-icon-inactive.png');
                }
                else {
                    iconSource = focused
                    ? require('./../../../images/TabBar/receipt-edit-icon-active.png')
                    : require('../../../images/TabBar/receipt-edit-icon-inactive.png');
                }

                return <Image source={iconSource}></Image>
            },
            tabBarStyle: {
                height: 65,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: -10,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: mainColors.white,
                paddingBottom: 15,
                paddingTop: 5,
                elevation: 5
            },
            tabBarActiveTintColor: mainColors.primaryButtonColor,
            tabBarInactiveTintColor: mainColors.textDarkGrey,
            tabBarLabelStyle: {
                fontSize: getFontSize(14),
                fontWeight: 400,
                fontFamily: 'Inter-Medium'
            }
        })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="User" component={UserProfile} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="History" component={LeavesRecord} />
        </Tab.Navigator>
    );
} 