import React, {FC, useState} from 'react';
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {Text, Card, Avatar} from 'react-native-paper';
import {ProgressChart, BarChart} from 'react-native-chart-kit';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'app/util';

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
    const {t} = useTranslation();
    const {theme} = useTheme();
    console.log('card metrics??', card.metrics);
    return (
        <Card>
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
                                        card.metrics.sentiment,
                                    ],
                                    color: () => 'rgba(248,0,0,1)',
                                },
                            ],
                            labels: [
                                t('Impact'),
                                t('Engagement'),
                                t('Retweets Index'),
                                t('Sentiment'),
                            ],
                        }}
                        yAxisLabel=""
                        yAxisSuffix=""
                        yLabelsOffset={35}
                        width={width}
                        height={400}
                        fromZero
                        verticalLabelRotation={30}
                        chartConfig={chartConfig}
                    />
                </View>
            </Card.Content>
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
