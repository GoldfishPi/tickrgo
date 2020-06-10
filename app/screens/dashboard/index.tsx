import React, {FC} from 'react';
import {Text} from 'react-native';
import {useUser} from '../../util';

interface DashboardScreensProps {}

const DashboardScreens: FC<DashboardScreensProps> = ({}) => {
    const {msId} = useUser();
    return <Text>msId:{msId}</Text>;
};

export default DashboardScreens;
