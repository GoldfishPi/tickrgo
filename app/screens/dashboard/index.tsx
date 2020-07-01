import React, {FC} from 'react';
import {View} from 'react-native';
import {Text, IconButton} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Overview from './overview';
import CardsScreen from './cards';
import FlowScreen from './flow';

interface DashboardScreensProps {}

const Tab = createBottomTabNavigator();

const DashboardScreens: FC<DashboardScreensProps> = ({}) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Overview"
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
                        <IconButton
                            icon="water"
                            accessibilityStates={{}}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default DashboardScreens;
