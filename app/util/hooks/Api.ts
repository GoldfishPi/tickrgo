import axios from 'axios';
import {useEnv} from 'app/util';
import {useMemo} from 'react';

const createApi = (apiUrl: string, apiToken: string | boolean) => {
    return axios.create({
        baseURL: apiUrl,
        headers: {
            common: {
                Authorization: apiToken,
            },
        },
    });
};

export const useApi = () => {
    const {apiUrl, apiToken} = useEnv();
    const api = useMemo(() => createApi(apiUrl, apiToken), [apiUrl, apiToken]);
    return api;
};
