import React, { useContext, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '../contexts/ThemeContext';

const NavigationButton = ({ name, active, activeName, size, color, navigation, screenName }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { theme } = useContext(ThemeContext);

    const handleHoverIn = () => {
        setIsHovered(true);
    };

    const handleHoverOut = () => {
        setIsHovered(false);
    };

    const handleButtonPress = () => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={[
                    styles.navigationButton,
                    {
                        backgroundColor: isHovered ?
                            (theme.theme === 'light' ?
                                theme.colors.primary_dark : theme.colors.primary_light) : 'transparent'
                    },
                ]}
                onPress={handleButtonPress}
                onHoverIn={handleHoverIn}
                onHoverOut={handleHoverOut}
            >
                <Ionicons
                    backgroundColor="transparent"
                    name={active ? activeName : name}
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
        padding: 14,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NavigationButton;
