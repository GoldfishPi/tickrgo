import React, {FC, useEffect, useState} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {useApi} from 'app/util';
import Carousel from 'react-native-snap-carousel';
import {useTheme} from 'app/util/providers/ThemeProvider';
import TweetCard from 'app/components/Cards/Tweet';
import RedditCard from 'app/components/Cards/Reddit';
import NewsCard from 'app/components/Cards/News';

interface CardsScreenProps {}

const CardsScreen: FC<CardsScreenProps> = ({}) => {
    const api = useApi();
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        api.post('/bi/cards', {
            filters: {
                dates: 'now-7d/d',
            },
            options: {
                types: ['newsroom', 'tweets', 'reddit'],
            },
        }).then((res) => setData(res.data));
    }, []);

    const screenWidth = Dimensions.get('screen').width;

    const renderItem = ({item}: any) => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {item.type === 'tweets' &&
                    item.data.map((card: any) => (
                        <TweetCard key={card.id} card={card} />
                    ))}
                {item.type === 'reddit' &&
                    item.data.map((card: any) => (
                        <RedditCard key={card.id} card={card} />
                    ))}
                {item.type === 'news' &&
                    item.data.map((cluster) => (
                        <NewsCard key={cluster.clusterId} cluster={cluster} />
                    ))}
            </ScrollView>
        );
    };
    return (
        <View>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
            />
        </View>
    );
};

export default CardsScreen;
