import * as React from 'react';
import { createContext, useContext, useState, SetStateAction } from 'react';

type Env = 'dev' | 'qa' | 'stage' | 'prod';
export interface EnvState {
    env:Env;
    setEnv:any;
}

export const EnvContext = createContext<EnvState>({
    env:'dev',
    setEnv:() => null
});

export const EnvProvider: React.FC = ({ children }) => {
    const [ env, setEnv ] = useState<Env>('prod');
    const state = {
        env,
        setEnv
    }
    return (
        <EnvContext.Provider value={ state }>
            { children }
        </EnvContext.Provider>
    )
};

export const useEnv = () => ({
    ...useContext(EnvContext)
});
