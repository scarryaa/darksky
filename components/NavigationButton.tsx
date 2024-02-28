import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const NavigationButton = ({ name, size, color, navigation }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHoverIn = () => {
        setIsHovered(true);
    };

    const handleHoverOut = () => {
        setIsHovered(false);
    };

    const handleButtonPress = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={[
                    styles.navigationButton,
                    { backgroundColor: isHovered ? 'lightblue' : 'transparent' },
                ]}
                onPress={handleButtonPress}
                onHoverIn={handleHoverIn}
                onHoverOut={handleHoverOut}
            >
                <Ionicons
                    backgroundColor="transparent"
                    name={name}
                    size={size}
                    color={color}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
    },
    navigationButton: {
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NavigationButton;
