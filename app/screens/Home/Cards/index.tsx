import NewsCard from 'app/components/Cards/News';
import RedditCard from 'app/components/Cards/Reddit';
import TweetCard from 'app/components/Cards/Tweet';
import {useApi} from 'app/util';
import React, {FC, useEffect, useState} from 'react';
import {Dimensions, ScrollView, View, ActivityIndicator} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LoadingScreen from 'app/screens/Auth/Loading';
import LoadingSpinner from 'app/components/LoadingSpinner';

interface CardsScreenProps {}

const CardsScreen: FC<CardsScreenProps> = ({}) => {
    const api = useApi();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        api.post('/bi/cards', {
            filters: {
                dates: 'now-7d/d',
            },
            options: {
                types: ['newsroom', 'tweets', 'reddit'],
            },
        }).then((res) => {
            setLoading(false);
            setData(res.data);
        });
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
                    item.data.map((cluster: any) => (
                        <NewsCard key={cluster.clusterId} cluster={cluster} />
                    ))}
            </ScrollView>
        );
    };

    if (loading) {
        return <LoadingSpinner />;
    }
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
