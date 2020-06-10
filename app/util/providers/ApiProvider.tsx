import * as React from 'react';
import {createContext, useContext, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import {useEnv} from './EnvProvider';

const devUrl = 'http://localhost:3000';
const qaUrl = 'https://apiqa.tickr.com';
const prodUrl = 'https://api2.tickr.com';

interface ApiState {
    api: AxiosInstance;
}

export const ApiContext = createContext<ApiState>({
    api: axios,
});

export const ApiProvider: React.FC = ({children}) => {
    const {env} = useEnv();

    const api = axios.create({baseURL: devUrl});

    useEffect(() => {
        switch (env) {
            case 'dev':
                api.defaults.baseURL = devUrl;
                break;
            case 'prod':
                api.defaults.baseURL = prodUrl;
                break;
            case 'qa':
                api.defaults.baseURL = qaUrl;
                break;
        }
    }, [env, api]);

    const state = {
        api,
    };

    return <ApiContext.Provider value={state}>{children}</ApiContext.Provider>;
};

export const useApi = () => ({
    ...useContext(ApiContext),
});
