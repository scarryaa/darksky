import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from "../../../Text";
import { ThemeContext } from "../../../../contexts/ThemeContext";

type BookmarkButtonProps = {
    bookmarked?: boolean;
    big?: boolean;
    onBookmark: () => void;
}

const BookmarkButton = ({ bookmarked, big, onBookmark }: BookmarkButtonProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.bookmarkButton, { gap: theme.spacing.small / 2 }]}>
            <Ionicons
                backgroundColor="transparent"
                name={'bookmark-outline'}
                size={big ? 20 : 16}
                color={theme.colors.textDarkGrey}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    bookmarkButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
});

export default BookmarkButton;