import axios from 'axios';
import {useEnv} from './EnvProvider';

export const useApi = () => {
    const {apiUrl, apiToken} = useEnv();
    const api = axios.create({
        baseURL: apiUrl,
        headers: {
            common: {
                Authorization: apiToken,
            },
        },
    });

    return api;
};
