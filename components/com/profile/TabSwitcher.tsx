import React, { useState } from 'react';
import { View, StyleSheet, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import Text from '../../Text';

export interface Tab {
  title: string;
  onPress: () => void;
}

interface TabSwitcherProps {
  tabs: Tab[];
  style?: StyleProp<ViewStyle>
}

const TabSwitcher = ({ tabs, style }: TabSwitcherProps): JSX.Element => {
  const { theme } = useTheme();
  const [focusedTab, setFocusedTab] = useState<Tab>();
  const [hoveredTab, setHoveredTab] = useState<Tab>();

  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab: Tab) => (
        <Pressable
          key={tab.title}
          style={[{ paddingHorizontal: theme.spacing.md / 1.5 }, hoveredTab === tab && { backgroundColor: theme.colors.primary_highlight }]}
          onPress={() => { tab.onPress(); }}
          onFocus={() => { setFocusedTab(tab); }}
          onBlur={() => { setFocusedTab(undefined); }}
          onHoverIn={() => { setHoveredTab(tab); }}
          onHoverOut={() => { setHoveredTab(undefined); }}
        >
          <Text style={[theme.typography.subheader, { borderBottomWidth: 4, paddingVertical: theme.spacing.md / 1.5, borderBottomColor: 'rgba(0, 0, 0, 0)' }, focusedTab === tab && { borderBottomColor: theme.colors.secondary }]}>{tab.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
});

export default TabSwitcher;
