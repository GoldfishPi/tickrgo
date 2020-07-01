import React, {useReducer, createContext, useCallback} from 'react';
import sjcl from 'sjcl';
import pcrypt from '../bs/pcrypt';
import {useApi} from './ApiProvider';

type Action =
    | {
          type: 'SIGN_IN_REQUEST';
          payload: {username: string; password: string; env: string};
      }
    | {
          type: 'SIGN_IN_SUCCESS';
          payload: any;
      }
    | {
          type: 'SIGN_IN_FAILURE';
      }
    | {
          type: 'SIGN_OUT';
      }
    | {
          type: 'SIGN_IN_TOKEN_REQUEST';
          payload: {env: string; token: string};
      }
    | {
          type: 'SIGN_IN_TOKEN_SUCCESS';
          payload: any;
      }
    | {
          type: 'SIGN_IN_TOKEN_FAILURE';
      };
type State = {
    loading: boolean;
    userMeta: any;
};

interface Context {
    dispatch: (action: Action) => void;
    state: State;
}

const defaultState: State = {
    loading: false,
    userMeta: {},
};

const UserContext = createContext<Context>({
    dispatch: () => {},
    state: defaultState,
});

export const UserProvider: React.FC = ({children}) => {
    const {api} = useApi();

    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case 'SIGN_IN_REQUEST':
                signInAction(
                    action.payload.env,
                    action.payload.username,
                    action.payload.password,
                );
                return {
                    ...state,
                    loading: true,
                };
            case 'SIGN_IN_SUCCESS':
                return {
                    ...state,
                    loading: false,
                    userMeta: action.payload,
                };
            case 'SIGN_IN_FAILURE':
                return {
                    ...state,
                    loading: false,
                };
            case 'SIGN_IN_TOKEN_REQUEST':
                signInTokenAction(action.payload.env, action.payload.token);
                return {
                    ...state,
                    loading: true,
                };
            case 'SIGN_IN_TOKEN_SUCCESS':
                return {
                    ...state,
                    loading: false,
                    userMeta: action.payload,
                };
            case 'SIGN_IN_TOKEN_FAILURE':
                return {
                    ...state,
                    loading: false,
                    userMeta: false,
                };
            case 'SIGN_OUT':
                return {
                    ...state,
                    loading: false,
                    userMeta: false,
                };
            default:
                return state;
        }
    };

    const signInAction = useCallback(
        async (env: string, username: string, password: string) => {
            const saltRes = await api.get(`users/${username}/salt`);
            let salt_str: string = saltRes.data;

            var split = salt_str.split(':');
            var iter = parseInt(split[0], 10);
            var salt_base64 = split[1];

            var passbits = sjcl.codec.utf8String.toBits(
                pcrypt.to_utf8(password),
            );
            var salt = sjcl.codec.base64.toBits(salt_base64);
            let res = pcrypt.pbkdf2(passbits, salt, iter, 64);

            res = sjcl.codec.base64.fromBits(res);

            const auth = pcrypt.gen_auth(username, res);
            api.defaults.headers.common.Authorization = auth;

            try {
                const login = await api.post(`/users/auth/full?domain=${env}`);
                api.defaults.headers.common.Authorization = pcrypt.gen_auth(
                    login.data.user.token,
                );

                dispatch({
                    type: 'SIGN_IN_SUCCESS',
                    payload: login.data,
                });
            } catch (error) {
                dispatch({
                    type: 'SIGN_IN_FAILURE',
                });
            }
        },
        [api],
    );

    const signInTokenAction = useCallback(
        async (env: string, token: string) => {
            api.defaults.headers.common.Authorization = pcrypt.gen_auth(token);

            try {
                const login = await api.post(
                    `/users/auth/full?token=1&domain=${env}`,
                );
                dispatch({
                    type: 'SIGN_IN_TOKEN_SUCCESS',
                    payload: login.data,
                });
            } catch (e) {
                dispatch({
                    type: 'SIGN_IN_TOKEN_FAILURE',
                });
            }
        },
        [api],
    );

    const [state, dispatch] = useReducer(reducer, defaultState);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => ({
    ...React.useContext(UserContext),
});
