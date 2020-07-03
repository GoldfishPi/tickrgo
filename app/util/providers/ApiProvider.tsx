import axios from 'axios';
import {useEnv} from './EnvProvider';

// interface ApiState {
//     api: AxiosInstance;
// }

// export const ApiContext = createContext<ApiState>({
//     api: axios,
// });

// export const ApiProvider: React.FC = ({children}) => {
//     const {apiUrl} = useEnv();

//     const state = {
//         api,
//     };

//     return <ApiContext.Provider value={state}>{children}</ApiContext.Provider>;
// };

export const useApi = () => {
    const {apiUrl, apiToken} = useEnv();
    console.log('got stuff??', apiToken);
    const api = axios.create({
        baseURL: apiUrl,
        headers: {
            // Authorization: apiToken,
            common: {
                Authorization: apiToken,
            },
        },
    });

    return api;
};
