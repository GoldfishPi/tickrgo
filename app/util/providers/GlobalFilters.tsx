import React, {FC, createContext, useContext} from 'react';
import {State, Action, useFilters, defaultState} from '../hooks/Filters';

interface GlobalFiltersState extends State {
    dispatch: (action: Action) => void;
}

const GlobalFiltersContext = createContext<GlobalFiltersState>({
    ...defaultState,
    dispatch: () => {},
});

export const GlobalFiltersProvider: FC = ({children}) => {
    const state = useFilters();
    return (
        <GlobalFiltersContext.Provider value={state}>
            {children}
        </GlobalFiltersContext.Provider>
    );
};

export const useGlobalFilters = () => useContext(GlobalFiltersContext);
