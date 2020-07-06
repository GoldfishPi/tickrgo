import {useReducer} from 'react';

type FilterType = 'checkbox' | 'radio';
type FilterValues = Array<{
    val: string;
    label: string;
}>;
type AvailableFilter = {
    name: string;
    type: FilterType;
    values: FilterValues;
};
export type AvailableFilters = AvailableFilter[];

export type ActiveFilters = {
    [key: string]: string;
};

type FilterDefs = {
    [key: string]: {
        type: FilterType;
        values: () => Promise<FilterValues> | FilterValues;
        dependsOn: string[];
    };
};

export type Action =
    | {
          type: 'SET_ACTIVE_FILTERS';
          payload: ActiveFilters;
      }
    | {
          type: 'SET_AVAILABLE_FILTERS';
          payload: AvailableFilter[];
      }
    | {
          type: 'SET_ENABLED_FILTERS';
          payload: string[];
      }
    | {
          type: 'FETCH_AVAILABLE_FILTERS_REQUEST';
          payload: string[];
      }
    | {
          type: 'FETCH_AVAILABLE_FILTERS_SUCCESS';
          payload: {
              availableFilters: AvailableFilters;
              activeFilters: ActiveFilters;
          };
      }
    | {
          type: 'FETCH_AVAILABLE_FILTERS_FAILURE';
      };

type State = {
    loading: boolean;
    activeFilters: ActiveFilters;
    availableFilters: AvailableFilter[];
    enabledFilters: string[];
};

const filterDefs: FilterDefs = {
    dates: {
        type: 'checkbox',
        values: () => [
            {
                label: '3 Days',
                val: 'now-3d/d',
            },
            {
                label: '7 Days',
                val: 'now-7d/d',
            },
            {
                label: '14 Days',
                val: 'now-14d/d',
            },
            {
                label: '30 Days',
                val: 'now-30d/d',
            },
            {
                label: '90 Days',
                val: 'now-90d/d',
            },
        ],
        dependsOn: [],
    },
};

const initializer: State = {
    loading: false,
    activeFilters: {},
    availableFilters: [],
    enabledFilters: [],
};

const useFilters = () => {
    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case 'SET_ACTIVE_FILTERS':
                return {
                    ...state,
                    activeFilters: action.payload,
                };
            case 'FETCH_AVAILABLE_FILTERS_REQUEST':
                fetchAvailableFilters();
                return {
                    ...state,
                    enabledFilters: action.payload,
                    loading: true,
                };
            case 'FETCH_AVAILABLE_FILTERS_FAILURE':
                return {
                    ...state,
                    loading: true,
                };
            case 'FETCH_AVAILABLE_FILTERS_SUCCESS':
                return {
                    ...state,
                    availableFilters: action.payload.availableFilters,
                    activeFilters: action.payload.activeFilters,
                    loading: false,
                };
            default:
                return state;
        }
    };

    const fetchAvailableFilters = async () => {
        let newAvailableFilters: AvailableFilters = [];
        for (let name in enabledFilters) {
            const def = filterDefs[name];
            const values = def ? await def.values() : [];
            newAvailableFilters = [
                ...newAvailableFilters,
                {
                    name,
                    values,
                    type: def.type,
                },
            ];
        }

        // -- TODO: resolve default filters

        dispatch({
            type: 'FETCH_AVAILABLE_FILTERS_SUCCESS',
            payload: {
                activeFilters,
                availableFilters: newAvailableFilters,
            },
        });
    };

    const [
        {enabledFilters, availableFilters, activeFilters, loading},
        dispatch,
    ] = useReducer(reducer, initializer);

    return {enabledFilters, availableFilters, activeFilters, loading, dispatch};
};

export {useFilters};
