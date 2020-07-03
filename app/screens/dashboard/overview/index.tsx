import {useApi} from 'app/util';
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {Card, Text} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {useTheme} from 'app/util/providers/ThemeProvider';
import {useTranslation} from 'react-i18next';

interface DashboardScreensProps {}

const chartConfig: any = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0,
};
// const progressData = {
//     labels: [], // optional
//     data: [0.6],
// };

const DashboardScreens: FC<DashboardScreensProps> = ({}) => {
    const api = useApi();
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
        }).then((res: any) => {
            setData(res.data);
        });
    }, []);

    const screenWidth = Dimensions.get('screen').width;

    const renderItem = ({item}: any) => {
        // console.log('got item', item);
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

const DataCard = ({item}: any) => {
    const [width, setWidth] = useState(0);
    const {theme} = useTheme();
    const {t} = useTranslation();
    return (
        <Card
            accessibilityStates={{}}
            style={{margin: 20}}
            onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
            <Card.Title title={t(item.type)} accessibilityStates={{}} />
            <LineChart
                data={{
                    labels: item.data.map((d: any) =>
                        moment(d.period).format('DD'),
                    ),
                    datasets: [
                        {
                            data: item.data.map((d: any) => d.val),
                            color: () => {
                                switch (item.type) {
                                    case 'newsVolume':
                                        return theme.news;
                                    case 'redditVolume':
                                        return theme.reddit;
                                    case 'twitterVolume':
                                        return theme.twitter;
                                    default:
                                        return theme.twitter;
                                }
                            },
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

export default DashboardScreens;
