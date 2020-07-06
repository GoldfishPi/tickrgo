import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
import {useUser, useGlobalFilters} from '../util';
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
    const {dispatch: dispatchFilters} = useGlobalFilters();
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
        dispatchFilters({
            type: 'FETCH_AVAILABLE_FILTERS_REQUEST',
            payload: ['dates'],
        });
    }, [state]);

    if (state.loading) {
        return <LoadingSpinner text={t('Loggin In')} />;
    }

    return (
        <Stack.Navigator headerMode="none">
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
