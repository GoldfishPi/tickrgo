import React from 'react';
import {useApi, ApiProvider} from './providers/ApiProvider';
import {useEnv, EnvProvider} from './providers/EnvProvider';
import {useTheme, ThemeProvider} from './providers/ThemeProvider';
import {useUser, UserProvider} from './providers/UserProvider';

const TickrProviders: React.FC = ({children}) => {
    return (
        <>
            <EnvProvider>
                <ApiProvider>
                    <UserProvider>
                        <ThemeProvider>{children}</ThemeProvider>
                    </UserProvider>
                </ApiProvider>
            </EnvProvider>
        </>
    );
};
export {TickrProviders, useEnv, useApi, useUser, useTheme};
