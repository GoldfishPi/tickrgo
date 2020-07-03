import React, {FC, useEffect, useState} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {useApi} from 'app/util';
import Carousel from 'react-native-snap-carousel';
import {useTheme} from 'app/util/providers/ThemeProvider';
import TweetCard from 'app/components/Cards/Tweet';
import RedditCard from 'app/components/Cards/Reddit';

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
                types: ['tweets', 'reddit', 'instagram'],
            },
        }).then((res) => setData(res.data));
    }, []);

    const screenWidth = Dimensions.get('screen').width;

    const renderItem = ({item}: any) => {
        return (
            <Card accessibilityStates={{}}>
                <Card.Title title={item.type} accessibilityStates={{}} />
                <Card.Content>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {item.type === 'tweets' &&
                            item.data.map((card: any) => (
                                <TweetCard key={card.id} card={card} />
                            ))}
                        {item.type === 'reddit' &&
                            item.data.map((card: any) => (
                                <RedditCard key={card.id} card={card} />
                            ))}
                    </ScrollView>
                </Card.Content>
            </Card>
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
