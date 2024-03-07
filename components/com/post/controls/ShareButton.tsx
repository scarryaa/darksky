import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from "../../../Text";
import { ThemeContext } from "../../../../contexts/ThemeContext";

type MoreButtonProps = {
    big?: boolean;
    onMore: () => void;
}

const MoreButton = ({ big, onMore }: MoreButtonProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.moreButton, { gap: theme.spacing.small / 2 }]}>
            <Ionicons
                backgroundColor="transparent"
                name={'ellipsis-horizontal'}
                size={big ? 20 : 16}
                color={theme.colors.textDarkGrey}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    moreButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
});

export default MoreButton;