import React from 'react'
import { View, ViewStyle } from 'react-native'

export function EventStopper({
    children,
    style,
}: React.PropsWithChildren<{ style?: ViewStyle | ViewStyle[] }>) {
    const stop = (e: any) => {
        e.stopPropagation()
    }

    return (
        <View
            onStartShouldSetResponder={_ => true}
            onTouchEnd={stop}
            // @ts-ignore web only
            onClick={stop}
            onKeyDown={stop}
            style={style}>
            {children}
        </View>
    )
}