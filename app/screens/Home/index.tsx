import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {IconButton, Appbar} from 'react-native-paper';
import CardsScreen from './Cards';
import FlowScreen from './Flow';
import Overview from './Overview';
import {createStackNavigator} from '@react-navigation/stack';
import CardReport from './CardReport';
import {useTranslation} from 'react-i18next';

interface DashboardScreensProps {}

export type HomeTabParamList = {
    Overview: {};
    Cards: {
        onViewReport: () => void;
    };
    Flow: {};
    CardReport: {
        type: string;
        card: any;
    };
};

export type HomeStackParamList = {
    Home: {};
    CardReport: HomeTabParamList['CardReport'];
};

const Tab = createBottomTabNavigator<HomeTabParamList>();
const Stack = createStackNavigator<HomeStackParamList>();

const DashboardTabs = () => {
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
                initialParams={{
                    onViewReport: () => {
                        console.log('viewing report lol');
                    },
                }}
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
const DashboardScreens: FC<DashboardScreensProps> = ({}) => {
    const {t} = useTranslation();
    return (
        <Stack.Navigator
            screenOptions={{
                header: ({previous, scene, navigation}) => (
                    <Appbar.Header accessibilityStates={{}}>
                        {previous ? (
                            <Appbar.BackAction
                                accessibilityStates={{}}
                                onPress={navigation.goBack}
                            />
                        ) : (
                            <Appbar.Action
                                accessibilityStates={{}}
                                icon="menu"
                                onPress={() => {}}
                            />
                        )}
                        <Appbar.Content
                            accessibilityStates={{}}
                            title={
                                scene.descriptor.options.title
                                    ? scene.descriptor.options.title
                                    : scene.route.name
                            }
                        />
                        {!previous && (
                            <Appbar.Action
                                accessibilityStates={{}}
                                icon="filter-variant"
                                onPress={() => {}}
                            />
                        )}
                    </Appbar.Header>
                ),
            }}>
            <Stack.Screen name="Home" component={DashboardTabs} />
            <Stack.Screen
                name="CardReport"
                options={{title: t('Card Report')}}
                component={CardReport}
            />
        </Stack.Navigator>
    );
};

export default DashboardScreens;
