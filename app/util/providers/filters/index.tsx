import React from 'react';
import { FiltersProvider } from './FiltersProvider';
import { SearchesProvider } from './SearchesProvider';
import { SocialTopicsProvider } from './SocialTopicsProvider';

const ProvidersRegistery:React.FC = ({ children }) => (
        <SearchesProvider>
            <SocialTopicsProvider>
                { children }
            </SocialTopicsProvider>
        </SearchesProvider>
)

//EB NOTE dont add filters to this component
const FiltersProviders:React.FC = ({ children }) => {
    return (
        <ProvidersRegistery>
            <FiltersProvider>
                { children }
            </FiltersProvider>
        </ProvidersRegistery>
    )
}

export default FiltersProviders;
