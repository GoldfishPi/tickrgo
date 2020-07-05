import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Appbar} from 'react-native-paper';
import CardReport from './CardReport';
import Overview from './Overview';

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

const Stack = createStackNavigator<HomeStackParamList>();

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
            <Stack.Screen name="Home" component={Overview} />
            <Stack.Screen
                name="CardReport"
                options={{title: t('Card Report')}}
                component={CardReport}
            />
        </Stack.Navigator>
    );
};

export default DashboardScreens;
