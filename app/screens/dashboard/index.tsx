import React, {FC, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useApi} from '../../util/providers/ApiProvider';
import Carousel from 'react-native-snap-carousel';
import {Text, Card} from 'react-native-paper';
import {ProgressChart, LineChart} from 'react-native-chart-kit';
import moment from 'moment';

interface DashboardScreensProps {}

const chartConfig: any = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(131, 167, 234, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};
const progressData = {
    labels: [], // optional
    data: [0.6],
};

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

    const screenWidth = Dimensions.get('screen').width;

    const renderItem = ({item}: any) => {
        console.log('got item', item);
        return <DataCard item={item} />;
    };

    return (
        <>
            <View>
                <Carousel
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                />
            </View>
        </>
    );
};

const DataCard = ({ item }: any) => {
    const [width, setWidth] = useState(0);
    return (
        <Card
            accessibilityStates={{}}
            style={{margin: 20}}
            onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
            <Card.Title title={item.type} accessibilityStates={{}} />
            <ProgressChart
                accessor=""
                paddingLeft="0"
                backgroundColor=""
                data={progressData}
                width={width}
                height={220}
                strokeWidth={16}
                radius={90}
                chartConfig={chartConfig}
                hideLegend={false}
            />
            <LineChart
                data={{
                    labels: item.data.map((d: any) =>
                        moment(d.period).format('DD'),
                    ),
                    datasets: [
                        {
                            data: item.data.map((d: any) => d.val),
                            color: () => 'rgba(131, 167, 234, 1)',
                        },
                    ],
                }}
                width={width}
                height={220}
                chartConfig={chartConfig}
            />
        </Card>
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
        paddingTop: 20,
        paddingBottom: 20,
    },
});

export default DashboardScreens;
