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
      }
    | {
          type: 'SET_API_TOKEN';
          payload: string | false;
      };

interface State {
    env: EnvNames;
    apiUrl: string;
    apiToken: string | false;
}

interface Context extends State {
    dispatch: (action: Action) => void;
}

const defaultState: State = {
    env: 'QA',
    apiUrl: QA_URL,
    apiToken: false,
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
                    ...state,
                    env: 'STAGE',
                    apiUrl: STAGE_URL,
                };
            case 'SET_API_TOKEN':
                console.log('setting token', action.payload);
                return {
                    ...state,
                    apiToken: action.payload,
                };
            default:
                return state;
        }
    };

    const [{env, apiUrl, apiToken}, dispatch] = useReducer(
        reducer,
        defaultState,
    );
    return (
        <EnvContext.Provider value={{env, apiUrl, apiToken, dispatch}}>
            {children}
        </EnvContext.Provider>
    );
};

export const useEnv = () => ({
    ...useContext(EnvContext),
});
