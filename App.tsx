import 'react-native-gesture-handler';
import React from 'react';
import Screens from './app/screens';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {TickrProviders} from './app/util';
import {
    Provider as PaperProvider,
    DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import 'app/util/i18n';
declare const global: {HermesInternal: null | {}};

const App = () => {
    return (
        <PaperProvider theme={PaperDarkTheme}>
            <TickrProviders>
                <NavigationContainer
                    theme={{
                        ...DarkTheme,
                    }}>
                    <Screens />
                </NavigationContainer>
            </TickrProviders>
        </PaperProvider>
    );
};

export default App;
