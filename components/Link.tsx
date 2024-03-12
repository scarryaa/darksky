import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, Pressable, type StyleProp, type TextStyle } from 'react-native';
import { type NavigationProp } from '../routes/types';
import { router } from '../routes';

interface LinkProps {
  link: string | null;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  hoverUnderline: boolean;
  beforePressLogic?: (...r) => void;
}

const Link: React.FC<LinkProps> = ({ link, children, style, hoverUnderline = true, beforePressLogic }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handlePressIn = (): void => {
    setIsHovered(true);
  };

  const handlePressOut = (): void => {
    setIsHovered(false);
  };

  const handlePress = (): void => {
    // allows us to do stuff like caching the post
    if (beforePressLogic != null) beforePressLogic();
    if (link != null) navigation.navigate(...router.matchPath(link));
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
