import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {View, Text} from 'native-base';

interface LoadingScreenProps {}

const LoadingScreen: FC<LoadingScreenProps> = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text style={styles.title}>Logging In</Text>
        </View>
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
