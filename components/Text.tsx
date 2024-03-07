import { useContext } from "react";
import { Text as RNText, TextProps } from "react-native";
import { ThemeContext, TypographyVariant } from "../contexts/ThemeContext";

export type CustomTextProps = TextProps & {
    type?: TypographyVariant;
    lineHeight?: number;
    title?: string;
}

const Text: React.FC<CustomTextProps> = ({ lineHeight, children, type = 'md', style, ...props }) => {
    const { theme } = useContext(ThemeContext);
    const typography = theme.typography[type];
    const lineHeightStyle = { lineHeight: lineHeight ? 1 : undefined };
    const color = { color: theme.colors.text };

    return (
        <RNText
            style={[typography, lineHeightStyle, color, style]}
            {...props}>
            {children}
        </RNText>
    )
};

export default Text;