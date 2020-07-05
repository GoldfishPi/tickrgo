import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Appbar, Dialog, Text} from 'react-native-paper';
import CardReport from './CardReport';
import Overview from './Overview';
import {View} from 'react-native';
import FilterDialog from 'app/components/FilterDialog';

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
    const [filtersDialogActive, setFiltersDialogActive] = useState(false);
    return (
        <View style={{flex: 1}}>
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
                                    onPress={() =>
                                        setFiltersDialogActive(
                                            (active) => !active,
                                        )
                                    }
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
            <FilterDialog
                visible={filtersDialogActive}
                onDismiss={() => setFiltersDialogActive(false)}/>
        </View>
    );
};

export default DashboardScreens;
