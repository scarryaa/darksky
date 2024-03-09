import React, { useContext } from "react"
import { StyleSheet, Pressable, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from "../../../Text";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { HITSLOP_10 } from "../../../../constants";

type RepostButtonProps = {
    repostCount?: number;
    reposted?: boolean;
    big?: boolean;
    onRepost: () => void;
}

const RepostButton = ({ repostCount, reposted, big, onRepost }: RepostButtonProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.repostButton]}>
            <Pressable onPress={onRepost} hitSlop={HITSLOP_10} style={[styles.pressable, { gap: theme.spacing.xs }]}>
                <Ionicons
                    onPress={onRepost}
                    backgroundColor="transparent"
                    name={'repeat-outline'}
                    size={big ? 24 : 20}
                    color={reposted ? theme.colors.green : theme.colors.textDarkGrey}
                />
                {repostCount > 0 && <Text style={[
                    { color: reposted ? theme.colors.green : theme.colors.textDarkGrey },
                    theme.typography.lg
                ]}>{repostCount}</Text>}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    repostButton: {
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

export default RepostButton;