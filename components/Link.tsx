import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, Pressable, StyleProp, TextStyle } from "react-native";
import { NavigationProp } from "../routes/types";
import { router } from "../routes";

type LinkProps = {
    link: string;
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
    hoverUnderline: boolean;
    beforePressLogic?: (...r) => void;
};

const Link: React.FC<LinkProps> = ({ link, children, style, hoverUnderline = true, beforePressLogic }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    const handlePressIn = () => {
        setIsHovered(true);
    };

    const handlePressOut = () => {
        setIsHovered(false);
    };

    const handlePress = () => {
        // allows us to do stuff like caching the post
        if (beforePressLogic) beforePressLogic();
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
