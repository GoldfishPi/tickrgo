import React from 'react';
import {useEnv, EnvProvider} from './providers/EnvProvider';
import {useTheme, ThemeProvider} from './providers/ThemeProvider';
import {useUser, UserProvider} from './providers/UserProvider';
import { GlobalFiltersProvider, useGlobalFilters } from './providers/GlobalFilters';

const TickrProviders: React.FC = ({children}) => {
    return (
        <>
            <GlobalFiltersProvider>
                <EnvProvider>
                    <UserProvider>
                        <ThemeProvider>{children}</ThemeProvider>
                    </UserProvider>
                </EnvProvider>
            </GlobalFiltersProvider>
        </>
    );
};

export {TickrProviders, useEnv, useUser, useTheme, useGlobalFilters};

export {useApi} from './hooks/Api';
export {useFilters} from './hooks/Filters';
