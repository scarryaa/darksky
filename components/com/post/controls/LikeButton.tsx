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

const LikeButton = ({ likeCount, big, onLike }: LikeButtonProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.likeButton, { gap: theme.spacing.small / 2 }]}>
            <Ionicons
                backgroundColor="transparent"
                name={'heart-outline'}
                size={big ? 20 : 16}
                color={theme.colors.textDarkGrey}
            />
            {likeCount > 0 && <Text style={[
                { color: theme.colors.textDarkGrey },
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