import React from 'react';
import {useUser} from './UserProvider';
import {useApi} from './ApiProvider';

interface AlertsState {
    alerts: any[];
    fetchAlerts: () => Promise<any>;
}

export const AlertsContext = React.createContext<AlertsState>({
    alerts: [],
    fetchAlerts: async () => null,
});

export const AlertsProvider: React.FC = ({children}) => {
    const [alerts, setAlerts] = React.useState<any[]>([]);
    const {user, getDefaultMsid} = useUser();
    const {api} = useApi();

    const state = {
        alerts,
        async fetchAlerts() {
            if (!user) {
                return setAlerts([]);
            }
            const msid = getDefaultMsid();

            const alerts = await api.get(`/email-alert/${msid}`);
            const active = alerts.data.filter((a: any) => a.is_active);

            setAlerts([
                ...active.filter((a: any) => a.is_triggered),
                ...active.filter((a: any) => !a.is_triggered),
            ]);
        },
    };

    return (
        <AlertsContext.Provider value={state}>
            {children}
        </AlertsContext.Provider>
    );
};

export const useAlerts = () => ({
    ...React.useContext(AlertsContext),
});
