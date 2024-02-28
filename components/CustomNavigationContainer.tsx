import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native'; // Import useNavigation

import NavigationButton from './NavigationButton';

const CustomNavigationContainer = ({ children }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <View style={styles.sidebar}>
                    <NavigationButton
                        name="home"
                        size={32}
                        color="white"
                        navigation={navigation}
                    />
                </View>
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    navigator: {
        width: 250,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    sidebar: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
    },
    content: {
        flex: 1,
    },
});

export default CustomNavigationContainer;
