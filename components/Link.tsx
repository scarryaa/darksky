import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, Linking, Pressable, ViewStyle, StyleProp } from "react-native";
import { NavigationProp } from "../routes/types";
import { router } from "../routes";

type LinkProps = {
    link: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    hoverUnderline: boolean;
};

const Link: React.FC<LinkProps> = ({ link, children, style, hoverUnderline = true }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    const handlePressIn = () => {
        setIsHovered(true);
    };

    const handlePressOut = () => {
        setIsHovered(false);
    };

    const handlePress = () => {
        // @ts-ignore
        navigation.navigate(...router.matchPath(link));
    };

    return (
        <Pressable
            onHoverIn={handlePressIn}
            onHoverOut={handlePressOut}
            onPress={handlePress}
        >
            <Text style={[style, { textDecorationLine: (isHovered && hoverUnderline) ? 'underline' : 'none' }]}>
                {children}
            </Text>
        </Pressable>
    );
};

export default Link;
