import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Text, Surface} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

interface LoadingSpinnerProps {
    text?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({text}) => {
    const {t} = useTranslation();
    return (
        <Surface style={styles.container} accessibilityStates={{}}>
            <ActivityIndicator size="large" />
            <Text style={styles.title} accessibilityStates={{}}>
                {text ? text : t('Loading')}
            </Text>
        </Surface>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
    },
});

export default LoadingSpinner;
