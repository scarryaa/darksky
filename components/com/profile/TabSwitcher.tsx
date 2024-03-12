import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import Text from '../Text';

export interface Tab {
  title: string;
  onPress: () => void;
  key: string;
}

interface TabSwitcherProps {
  tabs: Array<Tab | null>;
  style?: StyleProp<ViewStyle>;
  defaultTabKey: string;
  onSelectTab: (tabKey: string) => void;
  resetTabs: boolean;
}

const TabSwitcher = ({ tabs, style, defaultTabKey, onSelectTab, resetTabs }: TabSwitcherProps): JSX.Element => {
  const { theme } = useTheme();
  const [focusedTab, setFocusedTab] = useState<string>();

  useEffect(() => {
    if (defaultTabKey != null && focusedTab == null) {
      const defaultTab = tabs.find(tab => tab?.key === defaultTabKey);
      setFocusedTab(defaultTab?.key);
    }
  }, [tabs]);

  useEffect(() => {
    if (defaultTabKey != null) {
      const defaultTab = tabs.find(tab => tab?.key === defaultTabKey);
      setFocusedTab(defaultTab?.key);
    }
  }, [resetTabs]);

  const [hoveredTab, setHoveredTab] = useState<Tab>();

  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab: Tab) => (
        <Pressable
          key={tab.key}
          style={[{ paddingHorizontal: theme.spacing.md / 1.5 }, hoveredTab === tab && { backgroundColor: theme.colors.primary_highlight }]}
          onPress={() => { onSelectTab(tab.key); setFocusedTab(tab.key); }}
          onHoverIn={() => { setHoveredTab(tab); }}
          onHoverOut={() => { setHoveredTab(undefined); }}
        >
          <Text style={[theme.typography.subheader, { borderBottomWidth: 4, paddingVertical: theme.spacing.md / 1.5, borderBottomColor: 'rgba(0, 0, 0, 0)' }, focusedTab === tab.key && { borderBottomColor: theme.colors.secondary }]}>{tab.title}</Text>
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
