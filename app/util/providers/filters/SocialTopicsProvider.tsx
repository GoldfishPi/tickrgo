
import React, { 
    createContext, 
    useState, 
    useContext, 
    useEffect,
    FC
} from 'react';
import { useApi } from './../ApiProvider'
import { useUser } from './../UserProvider'
import { Filter } from 'lib-bi';

interface SocialTopicsProps {
    socialTopics:Filter[];
    loading:boolean;
    fetch:() => Promise<void>;
}

const SocialTopicsContext = createContext<SocialTopicsProps>({
    socialTopics:[],
    loading:false,
    async fetch() {},
});

export const SocialTopicsProvider:FC = ({ children }) => {

    const { defaultBrandId } = useUser();
    const { api } = useApi();

    const [ socialTopics, setSocialTopics ] = useState<Filter[]>([]);
    const [ loading, setLoading ] = useState(true);

    const state = {
        loading,
        socialTopics,
        async fetch() {

            if(!defaultBrandId) {
                return setSocialTopics([]);
            };

            setLoading(true);

            const res = await api.post(`/bi/filters`, {
                filters:{},
                options:{
                    obj:true,
                    mixins:[{ type:'socialTopics' }]
                }
            });

            setLoading(false);
            setSocialTopics(res.data.socialTopics.primary)
        }
    }

    return (
        <SocialTopicsContext.Provider value={ state }>
            { children }
        </SocialTopicsContext.Provider>
    )
}

export const useSocialTopics = () => useContext(SocialTopicsContext);
