import { View, StyleSheet } from 'react-native';
import Text from '../components/Text';
import ViewHeader from '../components/ViewHeader';
import BasicView from '../components/BasicView';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const SearchScreen = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);

  return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <ViewHeader showBackButton={false}>
                <Text style={theme.typography.header}>
                    Search
                </Text>
            </ViewHeader>
            <BasicView>
            </BasicView>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // @ts-expect-error web only
    overflow: 'auto',
    flex: 1
  }
});

export default SearchScreen;
