import React, { createContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { useAuthStatus } from './hooks/useAuthStatus';
import { agent } from './services/api';
import { AuthContext } from './contexts/AuthContext';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoggedIn: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoggedIn: false,
          };
      }
    },
    {
      isLoading: true,
      isLoggedIn: false,
    });


  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        agent.login({ identifier: data.username, password: data.password })
        dispatch({ type: 'SIGN_IN' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );


  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isLoggedIn ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;
