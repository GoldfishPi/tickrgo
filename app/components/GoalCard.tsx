import moment from 'moment';
import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Button, Card, Portal, Text} from 'react-native-paper';
import {ProgressCircle} from 'react-native-svg-charts';
import GoalDialog from './GoalDialog';

interface GoalCardProps {
    title: string;
    color: string;
    trend: any[];
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

const GoalCard: FC<GoalCardProps> = ({color, title, trend}) => {
    const {t} = useTranslation();
    const [width, setWidth] = useState(0);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [goal, setGoal] = useState<number>(0);
    const averageDaily =
        trend.map((t) => t.val).reduce((acc, curr) => acc + curr) /
        trend.length;
    const complete =  averageDaily / goal;
    return (
        <View>
            <Card accessibilityStates={{}} style={styles.card}>
                <Card.Title
                    title={title}
                    accessibilityStates={{}}
                    right={() => (
                        <Button
                            accessibilityStates={{}}
                            color={color}
                            icon="plus"
                            onPress={() => setDialogVisible(true)}>
                            {t('Add Goal')}
                        </Button>
                    )}
                />
                <Card.Content>
                    {goal !== 0 && (
                        <View>
                            <Text
                                accessibilityStates={{}}
                                style={[
                                    styles.completeText,
                                    {
                                        color,
                                        left: width ? width / 2 - 20 : 0,
                                    },
                                ]}>
                                {Math.round(complete * 100)}%
                            </Text>
                            <ProgressCircle
                                style={{width, height: 200, marginBottom: 20}}
                                progress={complete}
                                progressColor={color}
                                backgroundColor={'black'}
                            />
                        </View>
                    )}
                    <View
                        onLayout={(layoutEvnet) =>
                            setWidth(layoutEvnet.nativeEvent.layout.width)
                        }>
                        <LineChart
                            data={{
                                labels: trend.map((d: any) =>
                                    moment(d.period).format('DD'),
                                ),
                                datasets: [
                                    {
                                        data: trend.map((d: any) => d.val),
                                        color: () => color,
                                    },
                                ],
                            }}
                            width={width}
                            height={220}
                            chartConfig={chartConfig}
                        />
                    </View>
                </Card.Content>
            </Card>
            <Portal>
                <GoalDialog
                    visible={dialogVisible}
                    onDismiss={() => setDialogVisible(false)}
                    value={goal}
                    onSave={(value) => {
                        setDialogVisible(false);
                        setGoal(value);
                    }}
                />
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
    },
    completeText: {
        fontSize: 32,
        position: 'absolute',
        top: 75,
    },
});

export default GoalCard;
