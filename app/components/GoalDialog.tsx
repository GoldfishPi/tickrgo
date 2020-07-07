import React, {FC, useState} from 'react';
import {Dialog, Button} from 'react-native-paper';
import {Slider} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'app/util';

interface GoalDialogProps {
    visible: boolean;
    onDismiss?: () => void;
    onSave?: (value: number) => void;
    value?: number;
    max?: number;
}

const GoalDialog: FC<GoalDialogProps> = ({
    visible,
    onDismiss,
    onSave,
    value = 0,
    max
}) => {
    const {t} = useTranslation();
    const {theme} = useTheme();
    const [newValue, setNewValue] = useState(value);
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title accessibilityStates={{}}>
                {t('Goal')}: {newValue} Avg. daily mentions
            </Dialog.Title>
            <Dialog.Content>
                <Slider
                    onValueChange={(val) =>
                        setNewValue(Math.round(val * 10000))
                    }
                    maximumValue={max}
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
