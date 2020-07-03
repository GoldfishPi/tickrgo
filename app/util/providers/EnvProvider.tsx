import React, {useReducer} from 'react';
import {createContext, useContext} from 'react';

type EnvNames = 'DEV' | 'QA' | 'STAGE' | 'PROD';

const DEV_URL = 'http://localhost:3000';
const QA_URL = 'https://apiqa.tickr.com';
const PROD_URL = 'https://api2.tickr.com';
const STAGE_URL = 'https://apistage.stage.tickr.com';

type Action =
    | {
          type: 'SET_ENV_QA';
      }
    | {
          type: 'SET_ENV_PROD';
      }
    | {
          type: 'SET_ENV_DEV';
      }
    | {
          type: 'SET_ENV_STAGE';
      };

interface State {
    env: EnvNames;
    apiUrl: string;
}

type Context = {
    dispatch: (action: Action) => void;
    env: EnvNames;
    apiUrl: string;
};

const defaultState: State = {
    env: 'QA',
    apiUrl: QA_URL,
};

export const EnvContext = createContext<Context>({
    dispatch: () => {},
    ...defaultState,
});

export const EnvProvider: React.FC = ({children}) => {
    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case 'SET_ENV_DEV':
                return {
                    ...state,
                    env: 'DEV',
                    apiUrl: DEV_URL,
                };
            case 'SET_ENV_PROD':
                return {
                    ...state,
                    env: 'PROD',
                    apiUrl: PROD_URL,
                };
            case 'SET_ENV_QA':
                return {
                    ...state,
                    env: 'QA',
                    apiUrl: QA_URL,
                };
            case 'SET_ENV_STAGE':
                return {
                    env: 'STAGE',
                    apiUrl: STAGE_URL,
                };
            default:
                return state;
        }
    };

    const [{env, apiUrl}, dispatch] = useReducer(reducer, defaultState);
    return (
        <EnvContext.Provider value={{env, apiUrl, dispatch}}>
            {children}
        </EnvContext.Provider>
    );
};

export const useEnv = () => ({
    ...useContext(EnvContext),
});
