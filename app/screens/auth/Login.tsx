import React, {FC} from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '..';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';
import {TextInput} from 'react-native-gesture-handler';
import {useUser} from '../../util';
import {Button, Text} from 'native-base';

interface LoginScreenProps
    extends StackScreenProps<RootStackParamList, 'Login'> {}

const LoginScreen: FC<LoginScreenProps> = ({}) => {
    const {dispatch} = useUser();
    const {values, handleChange, handleSubmit} = useFormik({
        async onSubmit() {
            dispatch({
                type: 'SIGN_IN_REQUEST',
                payload: {
                    username: 'app+spectrum@tickr.com',
                    password: 'spectrumTickr!',
                    env: 'spectrum',
                },
            });
            // const auth = await login(username, password, env);
            // console.log('success??', auth);
        },
        initialValues: {
            env: 'spectrum',
            username: 'app+spectrum@tickr.com',
            password: 'spectrumTickr!',
        },
    });
    return (
        <View>
            <View>
                <TextInput
                    placeholder="environment"
                    id="env"
                    value={values.env}
                    onChangeText={handleChange}
                />
                <TextInput
                    placeholder="username"
                    value={values.username}
                    onChange={handleChange}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                />
                <Button onPress={handleSubmit}>
                    <Text>Login</Text>
                </Button>
            </View>
        </View>
    );
};

export default LoginScreen;
