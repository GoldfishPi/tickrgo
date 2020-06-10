import React, {FC, useEffect} from 'react';
import DashboardScreens from './dashboard';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './auth/Login';
import SignUpScreen from './auth/SignUp';
import {useUser} from '../util';
import AsyncStorage from '@react-native-community/async-storage';

interface ScreensProps {}

export type RootStackParamList = {
    Dashboard: {};
    Login: {};
    SignUp: {};
};

const Stack = createStackNavigator<RootStackParamList>();
const Screens: FC<ScreensProps> = ({}) => {
    const {user, loginToken} = useUser();
    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('token');
            const env = await AsyncStorage.getItem('env');
            console.log('got token??', token);
            console.log('got env??', env);
            if (token && env) {
                const auth = await loginToken(token, env);
                console.log('authed??', auth);
            }
        })();
    }, [loginToken]);
    useEffect(() => {
        if (!user) {
            return;
        }
        AsyncStorage.setItem('token', user.user.token);
        AsyncStorage.setItem('env', 'spectrum');
    }, [user]);
    return (
        <Stack.Navigator>
            {user ? (
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
