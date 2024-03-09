import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from "../../../../contexts/ThemeContext";
import Dropdown, { MenuItem } from "../../dropdown/Dropdown";
import { EventStopper } from "../../util/EventStopper";

type MoreButtonProps = {
    big?: boolean;
}

const dropdownItems: MenuItem[] = [
    {
        label: 'Translate',
        icon: 'text-outline',
        iconSize: 18,
        onPress: () => { },
    },
    {
        label: 'Copy post',
        icon: 'clipboard-outline',
        iconSize: 18,
        onPress: () => { },
    },
    {
        label: 'Share post',
        icon: 'share-outline',
        iconSize: 18,
        onPress: () => { },
    },
    {
        label: 'separator'
    },
    {
        label: 'Mute thread',
        icon: 'volume-off-outline',
        iconSize: 20,
        onPress: () => { },
    },
    {
        label: 'Mute words & tags',
        icon: 'filter-outline',
        iconSize: 18,
        onPress: () => { },
    },
    {
        label: 'Hide post',
        icon: 'eye-off-outline',
        iconSize: 18,
        onPress: () => { },
    },
    {
        label: 'separator',
    },
    {
        label: 'Report post',
        icon: 'alert-circle-outline',
        iconSize: 18,
        onPress: () => { },
    }
]

const MoreButton = ({ big }: MoreButtonProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <EventStopper style={big ? {} : { flex: 1 }}>
            <Dropdown items={dropdownItems}>
                <View style={[styles.moreButton, { gap: theme.spacing.xs }]}>
                    <Ionicons
                        backgroundColor="transparent"
                        name={'ellipsis-horizontal'}
                        size={big ? 20 : 16}
                        color={theme.colors.textDarkGrey}
                    />
                </View>
            </Dropdown>
        </EventStopper>
    );
};

const styles = StyleSheet.create({
    moreButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default MoreButton;