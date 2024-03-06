import { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

const SettingsScreen = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <Button title={"Change Theme"} onPress={toggleTheme}></Button>
            <Text style={[styles.text]}>
                Settings
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },
});

export default SettingsScreen;