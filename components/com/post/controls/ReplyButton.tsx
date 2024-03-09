import React, { useContext } from 'react'
import { StyleSheet, Pressable, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from '../../../Text';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { HITSLOP_10 } from '../../../../constants';

interface ReplyButtonProps {
  replyCount?: number;
  big?: boolean;
  onReply: () => void;
}

const ReplyButton = ({ replyCount, big, onReply }: ReplyButtonProps): JSX.Element => {
  const { theme } = useContext(ThemeContext);

  return (
        <View style={[styles.replyButton]}>
            <Pressable onPress={onReply} hitSlop={HITSLOP_10} style={[styles.pressable, { gap: theme.spacing.xs }]}>
                <Ionicons
                    backgroundColor="transparent"
                    name={'chatbubble-outline'}
                    size={(big ?? false) ? 20 : 16}
                    color={theme.colors.textDarkGrey}
                />
                {(replyCount != null) && replyCount > 0 && <Text style={[
                  { color: theme.colors.textDarkGrey },
                  theme.typography.lg
                ]}>{replyCount}</Text>}
            </Pressable>
        </View>
  );
};

const styles = StyleSheet.create({
  replyButton: {
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

export default ReplyButton;
