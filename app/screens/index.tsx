import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {useUser} from '../util';
import LoginScreen from './Auth/Login';
import SignUpScreen from './Auth/SignUp';
import HomeScreens from './Home';
import LoadingSpinner from 'app/components/LoadingSpinner';
import {useTranslation} from 'react-i18next';

interface ScreensProps {}

export type RootStackParamList = {
    Home: {};
    Login: {};
    SignUp: {};
    Loading: {};
};

const Stack = createStackNavigator<RootStackParamList>();
const Screens: FC<ScreensProps> = ({}) => {
    const {dispatch, state} = useUser();
    const {t} = useTranslation();
    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('token');
            const env = await AsyncStorage.getItem('env');
            if (token && env) {
                dispatch({
                    type: 'SIGN_IN_TOKEN_REQUEST',
                    payload: {
                        token,
                        env,
                    },
                });
            }
        })();
    }, [dispatch]);
    useEffect(() => {
        if (!state.userMeta?.user?.token) {
            return;
        }
        AsyncStorage.setItem('token', state.userMeta?.user?.token);
        AsyncStorage.setItem('env', 'spectrum');
    }, [state]);

    if (state.loading) {
        return <LoadingSpinner text={t('Loggin In')} />;
    }

    return (
        <Stack.Navigator
            screenOptions={{
                header: ({previous, scene}) => (
                    <Appbar.Header accessibilityStates={{}}>
                        {previous ? (
                            <Appbar.BackAction accessibilityStates={{}} />
                        ) : (
                            <Appbar.Action
                                accessibilityStates={{}}
                                icon="menu"
                                onPress={() => {}}
                            />
                        )}
                        <Appbar.Content
                            accessibilityStates={{}}
                            title={scene.route.name}
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
            {state.userMeta?.user ? (
                <Stack.Screen name="Home" component={HomeScreens} />
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen
                        name="SignUp"
                        options={{title: 'Sign Up'}}
                        component={SignUpScreen}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default Screens;
