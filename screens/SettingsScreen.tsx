import { useContext } from "react";
import { View, StyleSheet, Button } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import Text from "../components/Text";
import BasicView from "../components/BasicView";
import ViewHeader from "../components/ViewHeader";

const SettingsScreen = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <ViewHeader showBackButton={false}>
                <Text style={theme.typography.header}>
                    Settings
                </Text>
            </ViewHeader>
            <BasicView>
                <Button title={"Change Theme"} onPress={toggleTheme}></Button>
            </BasicView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default SettingsScreen;