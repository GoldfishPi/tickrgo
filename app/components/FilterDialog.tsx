import React, {FC} from 'react';
import {Text, Dialog, RadioButton} from 'react-native-paper';
import {View} from 'react-native';

interface FilterDialogProps {
    visible: boolean;
    onDismiss?: () => void;
}

const FilterDialog: FC<FilterDialogProps> = ({visible, onDismiss}) => {
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Content>
                <RadioButton.Group onValueChange={() => {}} value="second">
                    <View style={{flex: 1}}>
                        <View
                            style={{
                                flexGrow: 1,
                                minWidth: 20,
                                minHeight: 20,
                            }}>
                            <RadioButton
                                style={{flexGrow: 1, width: 20}}
                                value="first"
                                accessibilityStates={{}}
                            />
                        </View>
                        <Text>LOL</Text>
                    </View>
                </RadioButton.Group>
            </Dialog.Content>
        </Dialog>
    );
};

export default FilterDialog;
