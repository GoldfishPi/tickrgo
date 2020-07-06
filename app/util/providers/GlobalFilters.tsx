import React, {FC, createContext, useContext} from 'react';
import {
    ActiveFilters,
    AvailableFilters,
    Action,
    useFilters,
} from '../hooks/Filters';

interface GlobalFiltersState {
    activeFilters: ActiveFilters;
    availableFilters: AvailableFilters;
    dispatch: (action: Action) => void;
}

const GlobalFiltersContext = createContext<GlobalFiltersState>({
    dispatch: () => {},
    availableFilters: [],
    activeFilters: {},
});

export const GlobalFiltersProvider: FC = ({children}) => {
    const {activeFilters, availableFilters, dispatch} = useFilters();
    return (
        <GlobalFiltersContext.Provider
            value={{activeFilters, availableFilters, dispatch}}>
            {children}
        </GlobalFiltersContext.Provider>
    );
};

export const useGlobalFilters = () => useContext(GlobalFiltersContext);
