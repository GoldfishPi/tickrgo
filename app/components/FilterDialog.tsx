import React, {FC} from 'react';
import {Text, Dialog, RadioButton} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

interface FilterDialogProps {
    visible: boolean;
    onDismiss?: () => void;
}

const FilterDialog: FC<FilterDialogProps> = ({visible, onDismiss}) => {
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Content>
                <RadioButton.Group onValueChange={() => {}} value="second">
                    <View>
                        <View style={styles.form}>
                            <RadioButton value="first" />
                        </View>
                        <Text accessibilityStates={{}}>LOL</Text>
                    </View>
                </RadioButton.Group>
            </Dialog.Content>
        </Dialog>
    );
};

const styles = StyleSheet.create({
    form: {
        flexGrow: 1,
        minWidth: 20,
        minHeight: 20,
    },
    radioButton: {
        flexGrow: 1,
        width: 20,
    },
});

export default FilterDialog;
