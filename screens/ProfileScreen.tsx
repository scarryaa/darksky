import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const ProfileScreen = (): JSX.Element => {
  const { theme } = useTheme();

  return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32
  }
});

export default ProfileScreen;
