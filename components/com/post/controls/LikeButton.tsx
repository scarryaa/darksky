import React, { useContext } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from '../../../Text';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { HITSLOP_10 } from '../../../../constants';

interface LikeButtonProps {
  likeCount?: number;
  liked?: boolean;
  big?: boolean;
  onLike: () => void;
}

const LikeButton = ({ likeCount, liked, big, onLike }: LikeButtonProps): JSX.Element => {
  const { theme } = useContext(ThemeContext);

  return (
        <View style={[styles.likeButton]}>
            <Pressable onPress={onLike} hitSlop={HITSLOP_10} style={[styles.pressable, { gap: theme.spacing.xs }]}>
                <Ionicons
                    backgroundColor="transparent"
                    name={(liked ?? false) ? 'heart' : 'heart-outline'}
                    size={(big ?? false) ? 20 : 16}
                    color={(liked ?? false) ? theme.colors.red : theme.colors.textDarkGrey}
                />
                {likeCount != null && likeCount > 0 && <Text style={[
                  { color: (liked ?? false) ? theme.colors.red : theme.colors.textDarkGrey },
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
    alignItems: 'center'
  },
  pressable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default LikeButton;
