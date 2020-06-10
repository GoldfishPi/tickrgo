import React from 'react';
import { Trend, RequestOptions, ParsedObject, SearchFilters } from 'lib-bi';
import { useApi } from "../ApiProvider";

interface TrendState {
    fetchTrends:(filters:SearchFilters, options:RequestOptions) => Promise<ParsedObject<Trend>>;
}

export const TrendContext = React.createContext<TrendState>({
    async fetchTrends() {
        return {}
    }
});

export const BiTrendProvider:React.FC = ({ children }) => {

    const { api } = useApi();

    const state:TrendState = {
        async fetchTrends(filters, options) {

            const reqOptions:RequestOptions = {
                obj:true,
                ...options
            }

            const res = await api.post('/bi/trends', {
                filters,
                options:reqOptions
            });

            return res.data;
        }
    }

    return (
        <TrendContext.Provider value={ state }>
            { children }
        </TrendContext.Provider>
    )
}

export const useBiTrend = () => ({
    ...React.useContext(TrendContext)
})
