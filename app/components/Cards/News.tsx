import React, {FC} from 'react';
import {useTheme} from 'app/util';
import {Card, Avatar, Text, Button} from 'react-native-paper';
import {baseCardStyles} from './shared';
import {Image} from 'react-native';

interface NewsCardProps {
    cluster: any;
}

const NewsCard: FC<NewsCardProps> = ({cluster}) => {
    const {theme} = useTheme();
    const card = cluster.cards[0];
    return (
        <Card style={baseCardStyles.card}>
            <Card.Title
                title={card.source.name}
                left={() => (
                    <Image
                        source={{uri: card.source.logo.src}}
                        style={baseCardStyles.logo}
                    />
                )}
                right={() => (
                    <Avatar.Icon
                        icon="newspaper"
                        color="white"
                        style={{backgroundColor: theme.news}}
                        size={35}
                    />
                )}
            />
            <Card.Content>
                <Text style={baseCardStyles.subtitle}>{card.title}</Text>
                <Text />
                <Text>{card.body}</Text>
            </Card.Content>
            <Card.Actions>
                <Button color={theme.news}>More</Button>
            </Card.Actions>
        </Card>
    );
};

export default NewsCard;
