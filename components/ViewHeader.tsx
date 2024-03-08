import { View, StyleSheet } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

type ViewHeaderProps = {
    children: React.ReactNode;
    showBackButton: boolean;
}

const ViewHeader: React.FC<ViewHeaderProps> = ({ children, showBackButton = false }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.viewHeaderContainer}>
            <View style={[styles.viewHeader, {
                borderColor: theme.colors.border,
                paddingVertical: theme.spacing.md,
                paddingHorizontal: theme.spacing.md
            }]}>
                {children}
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    viewHeaderContainer: {
        alignItems: 'center',
    },
    viewHeader: {
        borderBottomWidth: 1,
        borderRightWidth: 1,
        maxWidth: 600,
        minWidth: 600,
        transform: 'translateX(-5%)',
        borderLeftWidth: 1,
    }
});

export default ViewHeader;