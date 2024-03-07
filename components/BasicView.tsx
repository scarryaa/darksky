import { useContext } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

type BasicViewProps = {
    children?: React.ReactNode;
    style?: any;
}

const BasicView: React.FC<BasicViewProps> = ({ children, style }) => {
    const { theme } = useContext(ThemeContext);
    const height = useWindowDimensions().height;

    return (
        <View style={[{ borderColor: theme.colors.border }, { minHeight: height + 1 }, styles.basicViewContainer, style]}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    basicViewContainer: {
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600,
        minWidth: 600,
        transform: 'translateX(-5%)',
    },
});

export default BasicView;