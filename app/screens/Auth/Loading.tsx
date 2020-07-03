import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Surface, Text} from 'react-native-paper';

interface LoadingScreenProps {}

const LoadingScreen: FC<LoadingScreenProps> = () => {
    return (
        <Surface style={styles.container} accessibilityStates={{}}>
            <ActivityIndicator size="large" />
            <Text style={styles.title} accessibilityStates={{}}>
                Logging In
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

export default LoadingScreen;
