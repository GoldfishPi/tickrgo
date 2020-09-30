import {RequestOptions, SearchFilters, ParsedObject} from 'lib-bi';
import {useApi} from './Api';
import {Trend} from 'lib-bi/dist/models/trends/types';
import {useState} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

interface Request {
    options: RequestOptions;
    filters: SearchFilters;
}

const useBi = <t>(
    body: Request,
    route: string,
) => {
    const api = useApi();
    const isObj = body.options.obj !== undefined ? body.options.obj : true;

    const [fetchedData, setFetchedData] = useState<ParsedObject<t>>({});

    const fetch = async () => {
        const {data} = await api.post<ParsedObject<t>>(`/bi/${route}`, {
            ...body,
            options: {
                ...body.options,
                obj: isObj,
            },
        });
        setFetchedData(data);
    };

    useDeepCompareEffect(() => {
        fetch();
    }, [body]);

    return fetchedData;
};

const useTrends = (body: Request) => {
    return useBi<Trend>(body, 'trends');
};

const useCards = (
    filters: SearchFilters,
    types: string[],
): [ParsedObject<any>, () => Promise<void>] => {
    const api = useApi();
    const [fetchedData, setFetchedData] = useState<ParsedObject<any>>({});

    const fetch = async () => {
        const {data} = await api.post('/bi/cards', {
            filters,
            options: {
                obj: true,
                types,
            },
        });

        setFetchedData(data);
    };

    return [fetchedData, fetch];
};

export {useTrends, useCards};
