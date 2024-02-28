import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <Text style={styles.subtitle}>Welcome to your profile!</Text>
            <Button
                title="Go Back to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 32,
    },
});

export default ProfileScreen;
