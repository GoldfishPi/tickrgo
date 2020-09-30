import {useNavigation} from '@react-navigation/native';
import NewsCard from 'app/components/Cards/News';
import RedditCard from 'app/components/Cards/Reddit';
import TweetCard from 'app/components/Cards/Tweet';
import GoalCard from 'app/components/GoalCard';
import {useGlobalFilters} from 'app/util';
import {useTheme} from 'app/util/providers/ThemeProvider';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, ScrollView, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useTrends, useCards} from 'app/util/hooks/libBi';
import {ParsedData} from 'lib-bi';

interface DashboardScreensProps {}

const DashboardScreens: FC<DashboardScreensProps> = _ => {
    const {activeFilters: filters} = useGlobalFilters();


    const trends = useTrends({
        filters,
        options: {
            mixins: [
                {type: 'newsVolume'},
                {type: 'twitterVolume'},
                {type: 'redditVolume'},
            ]
        }

    });

    const cards = useCards(filters, ['newsroom', 'tweets', 'reddit']);

    const screenWidth = Dimensions.get('screen').width;

    const renderItem = ({item}: any) => {
        return <DataCard item={{ key:item,data:trends[item] }} cards={cards} />;
    };

    return (
        <>
            <View>
                <Carousel
                    data={Object.keys(trends)}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                />
            </View>
        </>
    );
};

const DataCard = ({item, cards}: {item:any, cards:ParsedData[]}) => {
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
    const newsCards = cards.find(p => p.type === 'news');
    const tweetCards = cards.find(p => p.type === 'tweets');
    const redditCards = cards.find(p => p.type === 'reddit');
    return (
        <ScrollView>
            <GoalCard color={color} title={t(item.key)} trend={item.data.primary} />
            {cards &&
                item.key === 'twitterVolume' &&
                tweetCards?.data.map((card: any) => (
                    <TweetCard
                        card={card}
                        onMore={() =>
                            navigate('CardReport', {
                                type: 'tweet',
                                card,
                            })
                        }
                        key={card.id}
                    />
                ))}
    {cards &&
            item.key === 'newsVolume' &&
            newsCards?.data.map((card: any) => (
                <NewsCard cluster={card} key={card.clusterId} />
            ))}
    {cards &&
            item.key === 'redditVolume' &&
            redditCards?.data.map((card: any) => (
                <RedditCard card={card} key={card.id} />
            ))}
        </ScrollView>
    );
};

export default DashboardScreens;
