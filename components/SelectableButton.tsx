import { Pressable, StyleProp, ViewStyle, StyleSheet } from "react-native";
import Text from "./Text";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

type SelectableButtonProps = {
    label: string;
    selected: boolean;
    onSelect: () => void;
    left?: boolean;
    right?: boolean;
    style?: StyleProp<ViewStyle>
};

const SelectableButton = ({ label, selected, onSelect, left, right, style }: SelectableButtonProps) => {
    const { theme } = useContext(ThemeContext);
    const buttonLeftStyle: ViewStyle = { borderTopLeftRadius: theme.spacing.sm, borderBottomLeftRadius: theme.spacing.sm };
    const buttonRightStyle: ViewStyle = { borderTopRightRadius: theme.spacing.sm, borderBottomRightRadius: theme.spacing.sm };
    const buttonActiveStyle: ViewStyle = { backgroundColor: theme.colors.primary_highlight };
    const buttonStyle: ViewStyle = { backgroundColor: theme.colors.primary, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm, borderColor: theme.colors.border };

    return (
        <Pressable
            style={[
                buttonStyle,
                left && buttonLeftStyle,
                right && buttonRightStyle,
                selected && buttonActiveStyle,
                styles.selectableButton,
                style
            ]}
            onPress={onSelect}>
            <Text>{label}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    selectableButton: {
        borderWidth: 1,
    },
});

export default SelectableButton;