import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import NavigationButton from './NavigationButton';

const CustomNavigationContainer = ({ children, sidebarVisible }) => {
    const navigation = useNavigation();
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    return (
        <View style={styles.container}>
            {sidebarVisible ? <View style={styles.navigator}>
                <View style={styles.sidebar}>
                    <NavigationButton
                        active={true}
                        activeName={"home"}
                        screenName={"Home"}
                        name="home-outline"
                        size={28}
                        color="black"
                        navigation={navigation}
                    />
                    <NavigationButton
                        active={false}
                        activeName={"search"}
                        screenName={"Search"}
                        name="search-outline"
                        size={28}
                        color="black"
                        navigation={navigation}
                    />
                    <NavigationButton
                        active={false}
                        activeName={"settings"}
                        screenName={"Settings"}
                        name="settings-outline"
                        size={28}
                        color="black"
                        navigation={navigation}
                    />
                </View>
            </View> : <></>}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    navigator: {
        width: 80,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    sidebar: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
    },
    content: {
        flex: 1,
    },
});

export default CustomNavigationContainer;
