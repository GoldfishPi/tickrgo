import React, {FC, useState} from 'react';
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {Text, Card, Avatar, Button} from 'react-native-paper';
import {ProgressChart, BarChart} from 'react-native-chart-kit';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'app/util';
import {ScrollView} from 'react-native-gesture-handler';

interface TweetCardReportProps {
    card: any;
}

const chartConfig: any = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0,
};

const TweetCardReport: FC<TweetCardReportProps> = ({card}) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const {t} = useTranslation();
    const {theme} = useTheme();
    // console.log('card metrics??', card.metrics);
    return (
        <Card
            style={{
                flex: 1,
                flexGrow: 1,
            }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                }}>
                <Card.Title
                    title={card.account.name}
                    left={() => (
                        <Image
                            source={{uri: card.account.avatar}}
                            style={styles.logo}
                        />
                    )}
                    right={() => (
                        <Avatar.Icon
                            icon="twitter"
                            color="white"
                            style={[
                                styles.avatar,
                                {backgroundColor: theme.twitter},
                            ]}
                            size={35}
                        />
                    )}
                />

                <View
                    style={{flexGrow: 1}}
                    onLayout={({nativeEvent}) => {
                        setHeight(nativeEvent.layout.height);
                    }}>
                    <ScrollView style={{maxHeight: height}}>
                        <Card.Content>
                            <Text style={styles.body}>{card.text}</Text>
                            <View
                                onLayout={({nativeEvent}) =>
                                    setWidth(nativeEvent.layout.width)
                                }
                                style={styles.graph}>
                                <BarChart
                                    data={{
                                        datasets: [
                                            {
                                                data: [
                                                    card.metrics.impact,
                                                    card.metrics.engagement,
                                                    card.metrics.retweetsIndex,
                                                    card.metrics.favoritesIndex,
                                                ],
                                                color: () => 'rgba(248,0,0,1)',
                                            },
                                        ],
                                        labels: [
                                            t('Impact'),
                                            t('Engagement'),
                                            t('Retweets Index'),
                                            t('Favorites Index'),
                                        ],
                                    }}
                                    yAxisLabel=""
                                    yAxisSuffix=""
                                    yLabelsOffset={35}
                                    width={width}
                                    height={height * 0.8}
                                    fromZero
                                    verticalLabelRotation={50}
                                    chartConfig={chartConfig}
                                />
                            </View>
                        </Card.Content>
                    </ScrollView>
                </View>
                <Card.Actions>
                    <Button color={theme.twitter} icon="heart">
                        {card.metrics.favorites}
                    </Button>
                    <Button color={theme.twitter} icon="twitter-retweet">
                        {card.metrics.retweets}
                    </Button>
                </Card.Actions>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },

    body: {
        fontSize: 18,
    },
    graph: {
        marginTop: 20,
    },
    avatar: {
        marginRight: 20,
    },
});

export default TweetCardReport;
