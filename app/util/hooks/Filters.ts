import {useReducer} from 'react';
import {SearchFilters as ActiveFilters} from 'lib-bi';

type FilterType = 'checkbox' | 'radio';
type FilterValues = Array<{
    val: string;
    label: string;
    default?: boolean;
}>;
type AvailableFilter = {
    name: string;
    type: FilterType;
    values: FilterValues;
};
export type AvailableFilters = AvailableFilter[];

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

export type State = {
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
                default: true,
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

const defaultState: State = {
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
                fetchAvailableFilters(action.payload);
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

    const fetchAvailableFilters = async (enabledFilters: string[]) => {
        let newAvailableFilters: AvailableFilters = [];
        let newActiveFilters: ActiveFilters = {};
        for (let name of enabledFilters) {
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

        // -- If filter doesn't exist on activeFilters apply the default values
        for (let name of enabledFilters) {
            if (!activeFilters[name]) {
                const availableFilter = newAvailableFilters.find(
                    (n) => n.name === name,
                );
                const defaultValues = !availableFilter
                    ? ''
                    : availableFilter.values
                          .filter((v) => v.default)
                          .map((v) => v.val)
                          .toString();
                newActiveFilters = {
                    ...newActiveFilters,
                    [name]: defaultValues,
                };
            } else {
                newActiveFilters[name] = activeFilters[name];
            }
        }

        // -- Check if each activeFilters value exists on availableFilters
        for (let key in newActiveFilters) {
            const filter = availableFilters.find((f) => f.name === key);
            if (!filter) {
                continue;
            }
            const availableValues = filter.values.map((v) => v.val);
            const values = newActiveFilters[key]
                .split(',')
                .filter((v) => availableValues.find((a) => a === v))
                .toString();
            newActiveFilters[key] = values;
        }

        dispatch({
            type: 'FETCH_AVAILABLE_FILTERS_SUCCESS',
            payload: {
                activeFilters: newActiveFilters,
                availableFilters: newAvailableFilters,
            },
        });
    };

    const [
        {enabledFilters, availableFilters, activeFilters, loading},
        dispatch,
    ] = useReducer(reducer, defaultState);

    return {enabledFilters, availableFilters, activeFilters, loading, dispatch};
};

export {useFilters, defaultState};
