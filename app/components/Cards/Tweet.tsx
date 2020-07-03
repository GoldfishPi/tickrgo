import {useTheme} from 'app/util/providers/ThemeProvider';
import React, {FC} from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar, Card, Text, TouchableRipple, Button} from 'react-native-paper';
import {baseCardStyles} from './shared';

interface TweetCardProps {
    card: any;
}

const TweetCard: FC<TweetCardProps> = ({card}) => {
    const {theme} = useTheme();
    return (
        <Card accessibilityStates={{}} style={baseCardStyles.card}>
            <Card.Title
                accessibilityStates={{}}
                title={card.account.name}
                left={() => (
                    <Image
                        source={{uri: card.account.avatar}}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                        }}
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
                <Button color={theme.twitter}>More</Button>
            </Card.Actions>
        </Card>
    );
};

export default TweetCard;
