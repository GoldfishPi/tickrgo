import React, { useContext, createContext, useState, useEffect } from 'react';
import { SearchFilters } from 'lib-bi';
import { useSearches } from './SearchesProvider';
import { useSocialTopics } from './SocialTopicsProvider';

interface FiltersState {
    filters:SearchFilters;
    loading:boolean;
    setFilters:(filters:SearchFilters) => void;
    fetch:() => Promise<void>;
}
const FiltersContext = createContext<FiltersState>({
    loading:true,
    setFilters() { },
    filters:{
        dates:'now-7d/d'
    },
    async fetch() {},
});

export const FiltersProvider:React.FC = ({ children }) => {
    const [ filters, setFilters ] = useState<SearchFilters>({
        dates:'now-7d/d'
    });
    const [ loading, setLoading ] = useState<boolean>( true );

    const { fetch:fetchSocial } = useSocialTopics();
    const { fetch:fetchSearches } = useSearches();

    const state:FiltersState = {
        loading,
        filters,
        setFilters,
        async fetch() {
            setLoading(true);
            Promise.all([
                await fetchSocial(),
                await fetchSearches(),
            ]);
            setLoading(false);
        }
    }
    return (
        <FiltersContext.Provider value={ state }>
            { children }
        </FiltersContext.Provider>
    )
}

export const useFilters = () => useContext(FiltersContext);
