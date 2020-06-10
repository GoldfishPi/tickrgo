
import React from 'react';
import { createContext, useContext } from 'react';
import { useApi } from "./ApiProvider";
import { useUser } from "./UserProvider";

export interface SharesState {
    shares:any[];
    fetchShares:() => Promise<void>
}

export const SharesContext = createContext<SharesState>({
    shares:[],
    fetchShares:async () => {},
});

export const SharesProvider: React.FC = ({ children }) => {
    const { api } = useApi();
    const { user, msId } = useUser();

    const [ shares, setShares ] = React.useState<any[]>([]);
    const state = {
        shares,
        async fetchShares() {
            try {
                console.log('fetch shares started');
                console.log('fetch has user', user);
                console.log('fetch has msid', msId);
                const shares = await api.get(`/sharing/list/marketspace/${user.user.marketspaces[0].id}`);
                console.log('got shares', shares.data);
                return setShares(shares.data);
            } catch(e) {
                console.error('failed to fetch stuff');
            }
        }
    }
    return (
        <SharesContext.Provider value={state}>
            { children }
        </SharesContext.Provider>
    )
};

export const useShares = () => ({
    ...useContext(SharesContext)
});
