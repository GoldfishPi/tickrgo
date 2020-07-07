import React, {FC, useState} from 'react';
import {Dialog, Button} from 'react-native-paper';
import {Slider} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme, numberFormatter} from 'app/util';

interface GoalDialogProps {
    visible: boolean;
    onDismiss?: () => void;
    onSave?: (value: number) => void;
    value?: number;
    max?: number;
    min?: number;
}

const GoalDialog: FC<GoalDialogProps> = ({
    visible,
    onDismiss,
    onSave,
    value = 0,
    max,
    min,
}) => {
    const {t} = useTranslation();
    const {theme} = useTheme();
    const [newValue, setNewValue] = useState(value);
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title accessibilityStates={{}}>
                {t('Goal')}: {numberFormatter(newValue)} Avg. daily mentions
            </Dialog.Title>
            <Dialog.Content>
                <Slider
                    onValueChange={(val) => setNewValue(val)}
                    maximumValue={max}
                    minimumValue={min}
                    value={value}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button
                    color={theme.primary}
                    onPress={() => {
                        if (!onSave) {
                            return;
                        }
                        onSave(newValue);
                    }}>
                    {t('Save')}
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default GoalDialog;
