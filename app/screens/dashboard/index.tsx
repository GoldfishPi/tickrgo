import React, {FC, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useApi} from '../../util/providers/ApiProvider';
import {View} from 'native-base';
import {BarChart, Grid, XAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import moment from 'moment';

interface DashboardScreensProps {}

const DashboardScreens: FC<DashboardScreensProps> = ({}) => {
    const {api} = useApi();

    const [data, setData] = useState<{period: number; val: number}[]>([]);
    useEffect(() => {
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
                setData(res.data.newsVolume.primary);
            })
            .catch((e) => console.log('fail :(', e));
    }, [api]);
    return (
        <View style={{height: 200, padding: 20}}>
            <BarChart
                style={{height: 200}}
                data={data}
                contentInset={{top: 30, bottom: 30}}
                curve={shape.curveNatural}
                yAccessor={({item}) => item.val}
                svg={{fill: 'rgba(134, 65, 244, 0.8)'}}>
                <Grid />
            </BarChart>
            <XAxis
                style={{marginHorizontal: -10}}
                contentInset={{left: 10, right: 10}}
                data={data}
                formatLabel={(period) => moment(period).format('DD')}
                xAccessor={({item}) => item.period}
                svg={{fontSize: 10, fill: 'black'}}
            />
        </View>
    );
};

export default DashboardScreens;
