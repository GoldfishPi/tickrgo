import 'react-native-gesture-handler';
import React from 'react';
import Screens from './app/screens';
import {
    NavigationContainer,
    DarkTheme,
} from '@react-navigation/native';
import {TickrProviders} from './app/util';
declare const global: {HermesInternal: null | {}};

const App = () => {
    return (
        <TickrProviders>
            <NavigationContainer
                theme={{
                    ...DarkTheme,
                }}>
                <Screens />
            </NavigationContainer>
        </TickrProviders>
    );
};

export default App;
