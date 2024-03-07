import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

type BasicViewProps = {
    children?: React.ReactNode;
    style?: any;
}

const BasicView: React.FC<BasicViewProps> = ({ children, style }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[{ borderColor: theme.colors.border }, styles.basicViewContainer, style]}>
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
        minHeight: '100%',
        transform: 'translateX(-5%)',
    },
});

export default BasicView;