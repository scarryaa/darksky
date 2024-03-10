import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  onPress: () => void;
  triggerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  tooltipStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

// TODO improve this component?
const Tooltip = ({ text, children, onPress, triggerStyle, style, tooltipStyle, textStyle }: TooltipProps): JSX.Element => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { theme } = useTheme();

  return (
    <View style={style}>
      <Pressable
        style={triggerStyle}
        onPress={onPress}
        onHoverIn={() => {
          if (Platform.OS === 'web') {
            setTooltipVisible(true);
          }
        }}
        onHoverOut={() => {
          if (Platform.OS === 'web') {
            setTooltipVisible(false);
          }
        }}
      >
        {children}
      </Pressable>
      {tooltipVisible && (
        <View style={[styles.tooltip, { backgroundColor: theme.colors.primary_light }, tooltipStyle]}>
          <Text style={[textStyle, styles.tooltipText, { color: theme.colors.text }]}>{text}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    display: 'flex',
    position: 'absolute',
    padding: 4,
    borderRadius: 4,
    zIndex: 1000000,
    filter: 'drop-shadow(0 0 0.2rem rgba(0, 0, 0, 0.5))',
    top: '120%',
    left: '50%',
    // @ts-expect-error ignore translate error
    transform: [{ translateX: '-50%' }]
  },
  tooltipText: {
    color: 'white'
  }
});

export default Tooltip;
