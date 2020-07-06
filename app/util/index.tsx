import React from 'react';
import {useEnv, EnvProvider} from './providers/EnvProvider';
import {useTheme, ThemeProvider} from './providers/ThemeProvider';
import {useUser, UserProvider} from './providers/UserProvider';

const TickrProviders: React.FC = ({children}) => {
    return (
        <>
            <EnvProvider>
                <UserProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </UserProvider>
            </EnvProvider>
        </>
    );
};

export {TickrProviders, useEnv, useUser, useTheme};

export {useApi} from './hooks/Api';
export {useFilters} from './hooks/Filters';
