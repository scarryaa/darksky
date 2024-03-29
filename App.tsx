import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { agent } from './services/api';
import { AuthContext } from './contexts/AuthContext';
import CustomNavigationContainer from './components/CustomNavigationContainer';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import PostThreadScreen from './screens/PostThreadScreen';
import { PostProvider, PostsProvider } from './contexts/PostContext';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoggedIn: true
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoggedIn: false
          };
      }
    },
    {
      isLoading: true,
      isLoggedIn: false
    });

  const authContext: { signIn: (_) => Promise<void>, signOut: () => void } = React.useMemo<{
    signIn: (data: any) => Promise<void>;
    signOut: () => void;
  }>(
      () => ({
        signIn: async (data) => {
          await agent.login({ identifier: data.username, password: data.password })
          dispatch({ type: 'SIGN_IN' });
        },
        signOut: () => { dispatch({ type: 'SIGN_OUT' }); }
      }),
      []
      );

  return (
    <NavigationContainer>
      <PostProvider>
        <PostsProvider>
          <ThemeProvider>
            <CustomNavigationContainer sidebarVisible={state.isLoggedIn}>
              <AuthContext.Provider value={authContext}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  {(state.isLoggedIn === true)
                    ? (
                    <>
                      <Stack.Screen name="Home" getComponent={() => HomeScreen} />
                      <Stack.Screen name="Search" getComponent={() => SearchScreen} />
                      <Stack.Screen name="Settings" getComponent={() => SettingsScreen} />
                      <Stack.Screen name="PostThread" getComponent={() => PostThreadScreen} />
                      <Stack.Screen name="Profile" getComponent={() => ProfileScreen} />
                    </>
                      )
                    : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                      )}
                </Stack.Navigator>
              </AuthContext.Provider>
            </CustomNavigationContainer>
          </ThemeProvider>
        </PostsProvider>
      </PostProvider>
    </NavigationContainer>
  );
};

export default App;
