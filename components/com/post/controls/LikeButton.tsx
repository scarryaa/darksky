import React, { useContext } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from "../../../Text";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { HITSLOP_10 } from "../../../../constants";

type LikeButtonProps = {
    likeCount?: number;
    liked?: boolean;
    big?: boolean;
    onLike: () => void;
}

const LikeButton = ({ likeCount, liked, big, onLike }: LikeButtonProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.likeButton]}>
            <Pressable onPress={onLike} hitSlop={HITSLOP_10} style={[styles.pressable, { gap: theme.spacing.xs }]}>
                <Ionicons
                    backgroundColor="transparent"
                    name={liked ? 'heart' : 'heart-outline'}
                    size={big ? 20 : 16}
                    color={liked ? theme.colors.red : theme.colors.textDarkGrey}
                />
                {likeCount > 0 && <Text style={[
                    { color: liked ? theme.colors.red : theme.colors.textDarkGrey },
                    theme.typography.lg
                ]}>{likeCount}</Text>}
            </Pressable>
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
    pressable: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default LikeButton;