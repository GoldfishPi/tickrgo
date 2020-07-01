import React, {FC, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useApi} from '../../util/providers/ApiProvider';
import {View} from 'native-base';
import {BarChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

interface DashboardScreensProps {}

const DashboardScreens: FC<DashboardScreensProps> = ({}) => {
    const {api} = useApi();

    const [data, setData] = useState<number[]>([]);
    useEffect(() => {
        api.post('/bi/trends', {
            filters: {
                dates: 'now-90d/d',
            },
            options: {
                mixins: [{type: 'newsVolume'}],
                obj: true,
            },
        })
            .then((res) => {
                console.log('got data lol', JSON.stringify(res.data));
                setData(res.data.newsVolume.primary.map(({val}: any) => val));
            })
            .catch((e) => console.log('fail :(', e));
    }, [api]);
    return (
        <View>
            <Text>DashboardScreens</Text>
            <BarChart
                style={{height: 200}}
                data={data}
                contentInset={{top: 30, bottom: 30}}
                curve={shape.curveNatural}
                svg={{fill: 'rgba(134, 65, 244, 0.8)'}}>
                <Grid />
            </BarChart>
        </View>
    );
};

export default DashboardScreens;
