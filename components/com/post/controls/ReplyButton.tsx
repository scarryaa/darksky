import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from "../../../Text";
import { ThemeContext } from "../../../../contexts/ThemeContext";

type ReplyButtonProps = {
    replyCount?: number;
    big?: boolean;
    onReply: () => void;
}

const ReplyButton = ({ replyCount, big, onReply }: ReplyButtonProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.replyButton, { gap: theme.spacing.small / 2 }]}>
            <Ionicons
                backgroundColor="transparent"
                name={'chatbubble-outline'}
                size={big ? 20 : 16}
                color={theme.colors.textDarkGrey}
            />
            {replyCount > 0 && <Text style={[
                { color: theme.colors.textDarkGrey },
                theme.typography.lg
            ]}>{replyCount}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    replyButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
});

export default ReplyButton;