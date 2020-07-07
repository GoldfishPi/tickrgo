import {useNavigation} from '@react-navigation/native';
import NewsCard from 'app/components/Cards/News';
import RedditCard from 'app/components/Cards/Reddit';
import TweetCard from 'app/components/Cards/Tweet';
import LoadingSpinner from 'app/components/LoadingSpinner';
import {useApi, useGlobalFilters} from 'app/util';
import {useTheme} from 'app/util/providers/ThemeProvider';
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, ScrollView, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Card} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

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
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const {loading: loadingFilters} = useGlobalFilters();
    const filters: any = {
        dates: 'now-7d/d',
    };
    useEffect(() => {
        setLoading(true);
        Promise.all([
            api.post('/bi/trends', {
                filters,
                options: {
                    mixins: [
                        {type: 'newsVolume'},
                        {type: 'twitterVolume'},
                        {type: 'redditVolume'},
                    ],
                },
            }),
            api.post('/bi/cards', {
                filters,
                options: {
                    types: ['tweets', 'reddit', 'newsroom'],
                },
            }),
        ])
            .then(([trends, {data: newCards}]: any[]) => {
                // console.log('new cards', newCards.data.tweets.primary);
                console.log('finished fetch');
                setData(trends.data);
                setCards([
                    newCards.find(({type}: any) => type === 'news'),
                    newCards.find(({type}: any) => type === 'tweets'),
                    newCards.find(({type}: any) => type === 'reddit'),
                ]);
                setLoading(false);
            })
            .catch((e) => console.error(e));
    }, []);

    const screenWidth = Dimensions.get('screen').width;

    const renderItem = ({item, index}: any) => {
        return <DataCard item={item} cards={cards[index]} />;
        // return <View>{cards[index] && <Text>Hai i have cards lol</Text>}</View>;
    };

    if (loading) {
        return <LoadingSpinner />;
    }

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

const DataCard = ({item, cards}: any) => {
    const [width, setWidth] = useState(0);
    const {theme} = useTheme();
    const {t} = useTranslation();
    const {navigate} = useNavigation();
    // console.log('we got cards??', cards);
    return (
        <ScrollView>
            <Card
                accessibilityStates={{}}
                style={{margin: 10}}
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
            {cards &&
                cards.type === 'tweets' &&
                cards.data.map((card: any) => (
                    <TweetCard
                        card={card}
                        onMore={() =>
                            navigate('CardReport', {
                                type: cards.type,
                                card,
                            })
                        }
                        key={card.id}
                    />
                ))}
            {cards &&
                cards.type === 'news' &&
                cards.data.map((card: any) => (
                    <NewsCard cluster={card} key={card.clusterId} />
                ))}
            {cards &&
                cards.type === 'reddit' &&
                cards.data.map((card: any) => (
                    <RedditCard card={card} key={card.id} />
                ))}
        </ScrollView>
    );
};

export default DashboardScreens;
