import React, {FC, useEffect} from 'react';
import DashboardScreens from './dashboard';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './auth/Login';
import SignUpScreen from './auth/SignUp';
import {useUser} from '../util';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingScreen from './auth/Loading';

interface ScreensProps {}

export type RootStackParamList = {
    Dashboard: {};
    Login: {};
    SignUp: {};
    Loading: {};
};

const Stack = createStackNavigator<RootStackParamList>();
const Screens: FC<ScreensProps> = ({}) => {
    const {dispatch, state} = useUser();
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
        if (!state.userMeta) {
            return;
        }
        AsyncStorage.setItem('token', state.userMeta?.user?.token);
        AsyncStorage.setItem('env', 'spectrum');
    }, [state]);

    if (state.loading) {
        return <LoadingScreen />;
    }

    return (
        <Stack.Navigator>
            {state.userMeta?.user ? (
                <Stack.Screen name="Dashboard" component={DashboardScreens} />
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
