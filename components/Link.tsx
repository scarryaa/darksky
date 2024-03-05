import React, { useState } from "react";
import { Text, Linking, Pressable } from "react-native";

const Link = ({ displayText, link, children }) => {
    const [IsHovered, setIsHovered] = useState(false);

    const handlePressIn = () => {
        setIsHovered(true);
    };

    const handlePressOut = () => {
        setIsHovered(false);
    };

    const handlePress = () => {
        Linking.openURL(link);
    };

    return (
        <Pressable
            onHoverIn={handlePressIn}
            onHoverOut={handlePressOut}
            onPress={handlePress}
        >
            <Text style={{ textDecorationLine: IsHovered ? 'underline' : 'none' }}>
                {children}
            </Text>
        </Pressable>
    );
};

export default Link;
