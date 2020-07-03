import React, {FC} from 'react';
import {Card, Text, Avatar, Button} from 'react-native-paper';
import {Image} from 'react-native';
import {useTheme} from 'app/util';
import {baseCardStyles} from './shared';

interface RedditCardProps {
    card: any;
}

const RedditCard: FC<RedditCardProps> = ({card}) => {
    const {theme} = useTheme();
    return (
        <Card style={baseCardStyles.card}>
            <Card.Title
                title={card.account.username}
                right={() => (
                    <Avatar.Icon
                        icon="reddit"
                        color={'white'}
                        style={{backgroundColor: theme.reddit}}
                        size={35}
                    />
                )}
            />
            <Card.Content>
                <Text>{card.message.slice(0, 150)}</Text>
            </Card.Content>
            <Card.Actions>
                <Button color={theme.reddit}>More</Button>
            </Card.Actions>
        </Card>
    );
};

export default RedditCard;
