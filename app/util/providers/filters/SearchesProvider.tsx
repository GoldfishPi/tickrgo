import React, { 
    createContext, 
    useState, 
    useContext, 
    useEffect,
    FC
} from 'react';
import { Filter } from 'lib-bi';
import { useApi } from './../ApiProvider'
import { useUser } from './../UserProvider'

interface SearchesProps {
    searches:Filter[];
    loading:boolean;
    fetch:() => Promise<void>;
}

const SearchesContext = createContext<SearchesProps>({
    searches:[],
    loading:false,
    async fetch() {}
});

export const SearchesProvider:FC = ({ children }) => {

    const { defaultBrandId } = useUser();
    const { api } = useApi();

    const [ searches, setSearches ] = useState<Filter[]>([]);
    const [ loading, setLoading ] = useState(true);

    const state = {
        searches,
        loading,
        async fetch() {

            if(!defaultBrandId) {
                return setSearches([]);
            };

            setLoading(true);

            const res = await api
                .get<any[]>(`/brands/searches/${defaultBrandId}`)

            setLoading(false);

            setSearches(
                res.data.filter(d => d.is_active)
                .map(d => ({
                    name:d.name,
                    id:`${d.id}`
                }))
            )
        }
    }

    return (
        <SearchesContext.Provider value={ state }>
            { children }
        </SearchesContext.Provider>
    )
}

export const useSearches = () => useContext(SearchesContext);
