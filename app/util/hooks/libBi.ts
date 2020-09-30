import {RequestOptions, SearchFilters, ParsedObject, ParsedData} from 'lib-bi';
import {useApi} from './Api';
import {Trend} from 'lib-bi/dist/models/trends/types';
import {useState} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {AxiosInstance} from 'axios';

interface Request {
    options: RequestOptions;
    filters: SearchFilters;
}

const makeRequest = async <t>(
    route: string,
    api: AxiosInstance,
    body: Request,
) => {
    const isObj = body.options.obj !== undefined ? body.options.obj : true;
    const {data} = await api.post<t>(`/bi/${route}`, {
        ...body,
        options: {
            ...body.options,
            obj: isObj,
        },
    });
    return data;
};
const useBi = <t>(body: Request, route: string, defaultData: any = {}):[t, boolean] => {
    const api = useApi();
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<t>(defaultData);

    useDeepCompareEffect(() => {
        setLoading(true);
        makeRequest<t>(route, api, body).then((d) => {
            setData(d);
            setLoading(false);
        });
    }, [body]);

    return [data, loading];
};

const useTrends = (body: Request) => {
    return useBi<ParsedObject<Trend>>(body, 'trends');
};

const useCards = (filters: SearchFilters, types: string[]) =>
    useBi<ParsedData[]>(
        {filters, options: {obj: false, types}} as any,
        'cards',
        [],
    );

export {useTrends, useCards};
