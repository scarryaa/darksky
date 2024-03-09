import React from 'react'
import { View, type ViewStyle } from 'react-native'

export const EventStopper = ({
  children,
  style
}: React.PropsWithChildren<{ style?: ViewStyle | ViewStyle[] }>): JSX.Element => {
  const stop = (e: any): void => {
    e.stopPropagation()
  }

  return (
        <View
            onStartShouldSetResponder={_ => true}
            onTouchEnd={stop}
            // @ts-expect-error web only
            onClick={stop}
            onKeyDown={stop}
            style={style}>
            {children}
        </View>
  )
}
