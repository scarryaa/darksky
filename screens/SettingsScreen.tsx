import { View, StyleSheet, type TextStyle } from 'react-native';
import { useSetTheme, useTheme } from '../contexts/ThemeContext';
import Text from '../components/Text';
import BasicView from '../components/BasicView';
import ViewHeader from '../components/ViewHeader';
import SelectableButton from '../components/SelectableButton';

const SettingsScreen = (): JSX.Element => {
  const { theme } = useTheme();
  const { setTheme } = useSetTheme();
  const subheaderStyle: TextStyle = { marginBottom: theme.spacing.md };

  return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <ViewHeader showBackButton={false}>
                <Text style={theme.typography.header}>
                    Settings
                </Text>
            </ViewHeader>
            <BasicView style={{ padding: theme.spacing.md }}>
                <Text style={[subheaderStyle, theme.typography.subheader]}>
                    Appearance
                </Text>
                <View style={styles.selectableButtons}>
                    <SelectableButton left label='System' selected={theme.theme === 'system'} onSelect={() => { setTheme('system'); }} />
                    <SelectableButton label='Light' selected={theme.theme === 'light'} onSelect={() => { setTheme('light'); }} />
                    <SelectableButton label='Dim' selected={theme.theme === 'dim'} onSelect={() => { setTheme('dim'); }} />
                    <SelectableButton right label='Dark' selected={theme.theme === 'dark'} onSelect={() => { setTheme('dark'); }} />
                </View>
            </BasicView>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // @ts-expect-error web only
    overflow: 'auto',
    flex: 1
  },
  selectableButtons: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default SettingsScreen;
