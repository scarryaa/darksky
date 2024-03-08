import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from "../../../Text";
import { ThemeContext } from "../../../../contexts/ThemeContext";

type BookmarkButtonProps = {
    bookmarkCount?: number;
    bookmarked?: boolean;
    big?: boolean;
    onBookmark: () => void;
}

const BookmarkButton = ({ bookmarkCount, bookmarked, big, onBookmark }: BookmarkButtonProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.bookmarkButton, { gap: theme.spacing.xs }]}>
            <Ionicons
                onPress={onBookmark}
                backgroundColor="transparent"
                name={'bookmark-outline'}
                size={big ? 20 : 16}
                color={bookmarked ? theme.colors.blue : theme.colors.textDarkGrey}
            />
            {bookmarkCount > 0 && <Text style={[
                { color: bookmarked ? theme.colors.blue : theme.colors.textDarkGrey },
                theme.typography.lg
            ]}>{bookmarkCount}</Text>}
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