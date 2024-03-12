import React, { useContext } from 'react'
import { StyleSheet, Pressable, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from '../../Text';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { HITSLOP_10 } from '../../../../constants';

interface BookmarkButtonProps {
  bookmarkCount?: number;
  bookmarked?: boolean;
  big?: boolean;
  onBookmark: () => void;
}

const BookmarkButton = ({ bookmarkCount, bookmarked, big, onBookmark }: BookmarkButtonProps): JSX.Element => {
  const { theme } = useContext(ThemeContext);

  return (
        <View style={[styles.bookmarkButton]}>
            <Pressable onPress={onBookmark} hitSlop={HITSLOP_10} style={[styles.pressable, { gap: theme.spacing.xs }]}>
                <Ionicons
                    backgroundColor="transparent"
                    name={'bookmark-outline'}
                    size={(big ?? false) ? 20 : 16}
                    color={(bookmarked ?? false) ? theme.colors.blue : theme.colors.textDarkGrey}
                />
                {((bookmarkCount != null) && bookmarkCount > 0) && <Text style={[
                  { color: (bookmarked ?? false) ? theme.colors.blue : theme.colors.textDarkGrey },
                  theme.typography.lg
                ]}>{bookmarkCount}</Text>}
            </Pressable>
        </View>
  );
};

const styles = StyleSheet.create({
  bookmarkButton: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  pressable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default BookmarkButton;
