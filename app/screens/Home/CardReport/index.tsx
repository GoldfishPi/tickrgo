import React, {FC} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '..';
import TweetCardReport from 'app/components/CardReports/Tweet';

interface CardReportProps
    extends StackScreenProps<HomeStackParamList, 'CardReport'> {}

const CardReport: FC<CardReportProps> = ({route}) => {
    switch (route.params.type) {
        case 'tweets':
            return <TweetCardReport card={route.params.card}/>;
        default:
            return <View />;
    }
};

export default CardReport;
