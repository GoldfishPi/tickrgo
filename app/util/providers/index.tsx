import * as React from 'react';
import {EnvProvider} from './EnvProvider';
import {ApiProvider} from './ApiProvider';
import {UserProvider} from './UserProvider';
import {AlertsProvider} from './AlertsProvider';
import {SharesProvider} from './SharesProvider';
import {BiProviders} from './lib-bi';
import FiltersProviders from './filters';
import {ThemeProvider} from './ThemeProvider';

export const TickrProviders: React.FC = ({children}) => {
    return (
        <>
            <EnvProvider>
                <ApiProvider>
                    <UserProvider>
                        <AlertsProvider>
                            <SharesProvider>
                                <FiltersProviders>
                                    <ThemeProvider>
                                        <BiProviders>{children}</BiProviders>
                                    </ThemeProvider>
                                </FiltersProviders>
                            </SharesProvider>
                        </AlertsProvider>
                    </UserProvider>
                </ApiProvider>
            </EnvProvider>
        </>
    );
};
