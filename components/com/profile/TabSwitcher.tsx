import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import Text from '../../Text';

export interface Tab {
  title: string;
  onPress: () => void;
  key: string;
}

interface TabSwitcherProps {
  tabs: Array<Tab | null>;
  style?: StyleProp<ViewStyle>;
  defaultTabKey: string;
}

const TabSwitcher = ({ tabs, style, defaultTabKey }: TabSwitcherProps): JSX.Element => {
  const { theme } = useTheme();
  const [focusedTab, setFocusedTab] = useState<Tab | undefined | null>();

  useEffect(() => {
    if (defaultTabKey != null) {
      const defaultTab = tabs.find(tab => tab?.key === defaultTabKey);
      setFocusedTab(defaultTab ?? tabs[0]);
    }
  }, [defaultTabKey, tabs]);

  const [hoveredTab, setHoveredTab] = useState<Tab>();

  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab: Tab) => (
        <Pressable
          key={tab.key}
          style={[{ paddingHorizontal: theme.spacing.md / 1.5 }, hoveredTab === tab && { backgroundColor: theme.colors.primary_highlight }]}
          onPress={() => { tab.onPress(); }}
          onFocus={() => { setFocusedTab(tab); }}
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
