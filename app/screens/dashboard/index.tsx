import React, {FC, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useApi} from '../../util/providers/ApiProvider';
import {BarChart, Grid, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import Carousel from 'react-native-snap-carousel';

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
                mixins: [
                    {type: 'newsVolume'},
                    {type: 'twitterVolume'},
                    {type: 'redditVolume'},
                ],
            },
        }).then((res) => {
            setData(res.data);
        });
    }, [api]);

    const renderItem = ({item}: any) => {
        console.log('got item', item);
        return (
            <>
                <View style={styles.graphContainer}>
                    <YAxis
                        data={item.data}
                        yAccessor={(d: any) => d.item.val}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                    />
                    <BarChart
                        style={styles.graph}
                        data={item.data}
                        contentInset={{top: 30, bottom: 30}}
                        curve={shape.curveNatural}
                        yAccessor={(d: any) => d.item.val}
                        svg={{fill: 'rgba(134, 65, 244, 0.8)'}}>
                        <Grid />
                    </BarChart>
                </View>
                <Text style={styles.graphTitle}>{item.type}</Text>
            </>
        );
    };

    return (
        <>
            <View>
                <Carousel
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('screen').width}
                    itemWidth={Dimensions.get('screen').width}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    graphContainer: {
        padding: 20,
        flexDirection: 'row',
        minHeight: 200,
        minWidth: 200,
    },
    graph: {
        height: 200,
        flexGrow: 1,
    },
    graphTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
    },
});

export default DashboardScreens;
