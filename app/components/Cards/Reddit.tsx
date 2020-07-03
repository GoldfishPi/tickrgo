import React, {FC} from 'react';
import {Card, Text, Avatar} from 'react-native-paper';
import {Image} from 'react-native';
import {useTheme} from 'app/util';

interface RedditCardProps {
    card: any;
}

const RedditCard: FC<RedditCardProps> = ({card}) => {
    const {theme} = useTheme();
    return (
        <Card>
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
                <Text>{card.message}</Text>
            </Card.Content>
        </Card>
    );
};

export default RedditCard;
