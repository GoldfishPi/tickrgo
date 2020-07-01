import React, {FC, useEffect} from 'react';
import {Text} from 'react-native';
import {useApi} from '../../util/providers/ApiProvider';

interface DashboardScreensProps {}

const DashboardScreens: FC<DashboardScreensProps> = ({}) => {
    const {api} = useApi();
    useEffect(() => {
        console.log('am here');
        console.log('api', api.defaults.headers.common.Authorization);
        api.post('/bi/trends', {
            filters: {
                dates: 'now-7d/d',
            },
            options: {
                mixins: [{type: 'newsVolume'}],
                obj: true,
            },
        })
            .then((res) => {
                console.log('got data lol', JSON.stringify(res.data));
            })
            .catch((e) => console.log('fail :(', e));
    }, [api]);
    return <Text>Dashboard</Text>;
};

export default DashboardScreens;
