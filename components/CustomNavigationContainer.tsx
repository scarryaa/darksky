import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import NavigationButton from './NavigationButton';
import { ThemeContext } from '../contexts/ThemeContext';
import { PostsContext } from '../contexts/PostContext';
import { agent } from '../services/api';

interface CustomNavigationContainerProps {
  children: React.ReactNode;
  sidebarVisible: boolean;
}

const CustomNavigationContainer = ({ children, sidebarVisible }: CustomNavigationContainerProps): JSX.Element => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const { refreshPosts } = useContext(PostsContext);

  return (
        <View style={styles.container}>
            {sidebarVisible
              ? <View style={
                [
                  styles.navigator,
                  { backgroundColor: theme.colors.primary },
                  { borderColor: theme.colors.border }
                ]}>
                <View style={styles.sidebar}>
                    <NavigationButton
                        active={true}
                        activeName={'home'}
                        screenName={'Home'}
                        doOnPress={refreshPosts}
                        name="home-outline"
                        size={28}
                        color={theme.colors.text}
                        // @ts-expect-error TODO fix nav error
                        navigation={navigation}
                    />
                    <NavigationButton
                        active={false}
                        activeName={'search'}
                        screenName={'Search'}
                        name="search-outline"
                        size={28}
                        color={theme.colors.text}
                        // @ts-expect-error TODO fix nav error
                        navigation={navigation}
                    />
                    <NavigationButton
                        active={true}
                        activeName={'person-circle'}
                        screenName={'Profile'}
                        routeParams={{ name: agent.session?.did ?? '' }}
                        name="person-circle-outline"
                        size={28}
                        color={theme.colors.text}
                        // @ts-expect-error TODO fix nav error
                        navigation={navigation}
                    />
                    <NavigationButton
                        active={false}
                        activeName={'settings'}
                        screenName={'Settings'}
                        name="settings-outline"
                        size={28}
                        color={theme.colors.text}
                        // @ts-expect-error TODO fix nav error
                        navigation={navigation}
                    />
                </View>
            </View>
              : <></>}
            <View style={styles.content}>
                {children}
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  navigator: {
    width: 80,
    borderRightWidth: 1
  },
  sidebar: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    justifyContent: 'flex-start'
  },
  content: {
    flex: 1
  }
});

export default CustomNavigationContainer;
