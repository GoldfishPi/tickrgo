import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {IconButton} from 'react-native-paper';
import CardsScreen from './cards';
import FlowScreen from './flow';
import Overview from './overview';

interface DashboardScreensProps {}

const Tab = createBottomTabNavigator();

const DashboardScreens: FC<DashboardScreensProps> = ({}) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Overview}
                options={{
                    tabBarIcon: () => (
                        <IconButton icon="home" accessibilityStates={{}} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cards"
                component={CardsScreen}
                options={{
                    tabBarIcon: () => (
                        <IconButton icon="cards" accessibilityStates={{}} />
                    ),
                }}
            />
            <Tab.Screen
                name="Flow"
                component={FlowScreen}
                options={{
                    tabBarIcon: () => (
                        <IconButton icon="water" accessibilityStates={{}} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default DashboardScreens;
