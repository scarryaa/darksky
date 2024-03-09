import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { agent } from '../services/api';
import Text from '../components/Text';
import { AuthContext } from '../contexts/AuthContext';
import { dimTheme } from '../theme/themes';

const LoginScreen = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = React.useContext(AuthContext);

  const handleLogin = async (): Promise<void> => {
    await agent.login({ identifier: username, password }).then((res) => {
      if (res.success) {
        signIn({ username, password });
      } else {
        console.error('Login failed');
      }
    });
  };

  return (
        <View style={[styles.container, { backgroundColor: dimTheme.colors.primary }]}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => { setUsername(text); }}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => { setPassword(text); }}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default LoginScreen;
