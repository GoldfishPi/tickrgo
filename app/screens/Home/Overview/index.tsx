import {useNavigation} from '@react-navigation/native';
import NewsCard from 'app/components/Cards/News';
import RedditCard from 'app/components/Cards/Reddit';
import TweetCard from 'app/components/Cards/Tweet';
import GoalCard from 'app/components/GoalCard';
import LoadingSpinner from 'app/components/LoadingSpinner';
import {useApi, useGlobalFilters} from 'app/util';
import {useTheme} from 'app/util/providers/ThemeProvider';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, ScrollView, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useTrends, useCards} from 'app/util/hooks/libBi';
import {ParsedObject, Trend} from 'lib-bi';

interface DashboardScreensProps {}

// const progressData = {
//     labels: [], // optional
//     data: [0.6],
// };

const DashboardScreens: FC<DashboardScreensProps> = _ => {
    const api = useApi();
    const [data, setData] = useState<ParsedObject<Trend>>({});
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const {activeFilters: filters} = useGlobalFilters();

    const fetchTrends = useTrends({
        filters,
        options: {
            mixins: [
                {type: 'newsVolume'},
                {type: 'twitterVolume'},
                {type: 'redditVolume'},
            ]
        }
    });

    const fetchCards = useCards({
        filters,
        options: {
            types: ['tweets', 'reddit', 'newsroom'],
        },
    });

    useEffect(() => {
        setLoading(true);
        if (!filters) {
            return;
        }
        Promise.all([
            fetchTrends(),
            api.post('/bi/cards', {
                filters,
                options: {
                    types: ['tweets', 'reddit', 'newsroom'],
                },
            }),
        ])
            .then(([trends, { data:newCards }]) => {
                // console.log('new cards', newCards.data.tweets.primary);
                console.log('finished fetch');
                setData(trends);

                console.log('got cards', cards);

                setCards([
                    newCards.find(({type}: any) => type === 'news'),
                    newCards.find(({type}: any) => type === 'tweets'),
                    newCards.find(({type}: any) => type === 'reddit'),
                ]);
                setLoading(false);
            })
            .catch((e) => console.error(e));
    }, [filters]);

    const screenWidth = Dimensions.get('screen').width;

    const renderItem = ({item, index}: any) => {
        return <DataCard item={{ key:item,data:data[item] }} cards={cards[index]} />;
        // return <View>{cards[index] && <Text>Hai i have cards lol</Text>}</View>;
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <View>
                <Carousel
                    data={Object.keys(data)}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                />
            </View>
        </>
    );
};

const DataCard = ({item, cards}: any) => {
    const {theme} = useTheme();
    const {t} = useTranslation();
    const {navigate} = useNavigation();
    const [color, setColor] = useState('');
    useEffect(() => {
        switch (item.key) {
            case 'newsVolume':
                setColor(theme.news);
                break;
            case 'redditVolume':
                setColor(theme.reddit);
                break;
            case 'twitterVolume':
                setColor(theme.twitter);
                break;
            default:
                setColor(theme.twitter);
                break;
        }
    }, []);
    console.log('cards', cards);
    return (
        <ScrollView>
            <GoalCard color={color} title={t(item.key)} trend={item.data.primary} />
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
