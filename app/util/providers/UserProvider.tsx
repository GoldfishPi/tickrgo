import React from 'react';
import sjcl from 'sjcl';
import pcrypt from '../bs/pcrypt';
import {useApi} from './ApiProvider';

type User = any | false;
interface LoginResponse {
    success: boolean;
    token?: string;
}
interface UserState {
    user: User;
    login: (
        username: string,
        password: string,
        client: string,
    ) => Promise<LoginResponse>;
    loginToken: (token: string, env: string) => Promise<LoginResponse>;
    logout: () => void;
    getDefaultMsid: () => string;
    msId?: number;
    defaultBrandId?: number;
}

const UserContext = React.createContext<UserState>({
    user: false,
    login: async () => ({success: false}),
    loginToken: async () => ({success: false}),
    logout: () => {},
    getDefaultMsid: () => '',
});

export const UserProvider: React.FC = ({children}) => {
    const [user, setUser] = React.useState<User>(false);
    const [msId, setMsId] = React.useState<number>();
    const [defaultBrandId, setDefaultBrandId] = React.useState<number>();
    const {api} = useApi();

    const state: UserState = {
        user,
        msId,
        defaultBrandId,
        async login(username, password, client) {
            const saltRes = await api.get(`users/${username}/salt`);
            let salt_str: string = saltRes.data;

            var split = salt_str.split(':');
            var iter = parseInt(split[0]);
            var salt_base64 = split[1];

            var passbits = sjcl.codec.utf8String.toBits(
                pcrypt.to_utf8(password),
            );
            var salt = sjcl.codec.base64.toBits(salt_base64);
            let res = pcrypt.pbkdf2(passbits, salt, iter, 64);

            res = sjcl.codec.base64.fromBits(res);

            try {
                console.log('trying login');
                const auth = pcrypt.gen_auth(username, res);
                api.defaults.headers.common.Authorization = auth;
                var login = await api.post(`/users/auth/full?domain=${client}`);
                api.defaults.headers.common.Authorization =
                    login.data.user.token;

                setUser(login.data);
                setMsId(login.data.user.marketspaces[0].id);
                setDefaultBrandId(
                    login.data.user.marketspaces[0].meta.default_brand_id,
                );
                return {
                    success: true,
                    token: login.data.user.token,
                };
            } catch (error) {
                console.error(error);
                return {
                    success: false,
                };
            }
        },
        async loginToken(token, client) {
            try {
                api.defaults.headers.common.Authorization = token;

                const login = await api.post(
                    `/users/auth/full?token=1&domain=${client}`,
                );

                setUser(login.data);
                setMsId(login.data.user.marketspaces[0].id);
                setDefaultBrandId(
                    login.data.user.marketspaces[0].meta.default_brand_id,
                );
                return {
                    success: true,
                    token: login.data.user.token,
                };
            } catch (e) {
                return {
                    success: false,
                };
            }
        },
        async logout() {
            setUser(false);
        },
        getDefaultMsid() {
            if (user) {
                return user.user.marketspaces[0].id;
            }
        },
    };
    return (
        <UserContext.Provider value={state}>{children}</UserContext.Provider>
    );
};

export const useUser = () => ({
    ...React.useContext(UserContext),
});
