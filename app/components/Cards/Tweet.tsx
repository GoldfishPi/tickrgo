import {useTheme} from 'app/util/providers/ThemeProvider';
import React, {FC} from 'react';
import {Image} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {baseCardStyles} from './shared';

interface TweetCardProps {
    card: any;
    onMore?: () => void;
}

const TweetCard: FC<TweetCardProps> = ({card, onMore}) => {
    const {theme} = useTheme();
    return (
        <Card accessibilityStates={{}} style={baseCardStyles.card}>
            <Card.Title
                accessibilityStates={{}}
                title={card.account.name}
                left={() => (
                    <Image
                        source={{uri: card.account.avatar}}
                        style={baseCardStyles.logo}
                    />
                )}
                right={() => (
                    <Avatar.Icon
                        accessibilityStates={{}}
                        color={'white'}
                        style={{
                            backgroundColor: theme.twitter,
                        }}
                        size={35}
                        icon="twitter"
                    />
                )}
            />
            <Card.Content>
                <Text accessibilityStates={{}}>{card.text}</Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    color={theme.twitter}
                    accessibilityStates={{}}
                    onPress={onMore}>
                    More
                </Button>
            </Card.Actions>
        </Card>
    );
};

export default TweetCard;
