import React from 'react';
import {createContext, useContext} from 'react';
import axios, {AxiosInstance} from 'axios';
import {useEnv} from './EnvProvider';

interface ApiState {
    api: AxiosInstance;
}

export const ApiContext = createContext<ApiState>({
    api: axios,
});

export const ApiProvider: React.FC = ({children}) => {
    const {apiUrl} = useEnv();

    const api = axios.create({baseURL: apiUrl});

    const state = {
        api,
    };

    return <ApiContext.Provider value={state}>{children}</ApiContext.Provider>;
};

export const useApi = () => ({
    ...useContext(ApiContext),
});
