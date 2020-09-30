import {RequestOptions, SearchFilters, ParsedObject, ParsedData} from 'lib-bi';
import {useApi} from './Api';
import {Trend} from 'lib-bi/dist/models/trends/types';

interface Request {
    options: RequestOptions;
    filters: SearchFilters;
}

interface CardOptions extends RequestOptions {
    types: string[];
}

interface CardRequest {
    options: CardOptions;
    filters: SearchFilters;
}

const useBi = <t>(body: Request, route: string) => {
    const api = useApi();
    const isObj = body.options.obj !== undefined ? body.options.obj : true;

    const fetch = async (): Promise<ParsedObject<t>> => {
        const {data} = await api.post<ParsedObject<t>>(`/bi/${route}`, {
            ...body,
            options: {
                ...body.options,
                obj: isObj,
            },
        });
        return data;
    };
    return fetch;
};

const useTrends = (body: Request) => {
    return useBi<Trend>(body, 'trends');
};

const useCards = (body: any) => {
    console.log('body??', body);
    return useBi<ParsedData>(body, 'cards');
};

export {useTrends, useCards};
