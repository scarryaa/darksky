import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from "../../../Text";
import { ThemeContext } from "../../../../contexts/ThemeContext";

type LikeButtonProps = {
    likeCount?: number;
    liked?: boolean;
    big?: boolean;
    onLike: () => void;
}

const LikeButton = ({ likeCount, liked, big, onLike }: LikeButtonProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.likeButton, { gap: theme.spacing.xs }]}>
            <Ionicons
                onPress={onLike}
                backgroundColor="transparent"
                name={liked ? 'heart' : 'heart-outline'}
                size={big ? 20 : 16}
                color={liked ? theme.colors.red : theme.colors.textDarkGrey}
            />
            {likeCount > 0 && <Text style={[
                { color: liked ? theme.colors.red : theme.colors.textDarkGrey },
                theme.typography.lg
            ]}>{likeCount}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    likeButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
});

export default LikeButton;