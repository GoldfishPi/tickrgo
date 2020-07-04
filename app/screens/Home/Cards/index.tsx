import NewsCard from 'app/components/Cards/News';
import RedditCard from 'app/components/Cards/Reddit';
import TweetCard from 'app/components/Cards/Tweet';
import {useApi} from 'app/util';
import React, {FC, useEffect, useState} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LoadingSpinner from 'app/components/LoadingSpinner';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeTabParamList} from '..';

interface CardsScreenProps
    extends StackScreenProps<HomeTabParamList, 'Cards'> {}
const CardsScreen: FC<CardsScreenProps> = ({navigation}) => {
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
                        <TweetCard
                            key={card.id}
                            card={card}
                            onMore={() =>
                                navigation.navigate('CardReport', {
                                    card,
                                    type: item.type,
                                })
                            }
                        />
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
