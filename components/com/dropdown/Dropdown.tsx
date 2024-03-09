import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pressable, type View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { ThemeContext } from '../../../contexts/ThemeContext';
import Text from '../../Text';
import { HITSLOP_10 } from '../../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IonIconName } from '../../../types/IoniconsTypes';

export type MenuItem = {
  label: string | 'separator';
  icon?: never;
  iconSize?: never;
  onPress?: never;
} | {
  label: string;
  icon: IonIconName;
  iconSize: number;
  onPress: () => void;
};

type ItemProps = React.ComponentProps<(typeof DropdownMenu)['Item']>
const DropdownMenuItem = (props: ItemProps): JSX.Element => {
  const [focused, setFocused] = useState(false);
  const { theme } = useContext(ThemeContext);
  const focusBackgroundColor = theme.colors.primary_highlight;

  const onFocus = (): void => {
    setFocused(true);
  }

  const onBlur = (): void => {
    setFocused(false);
  }

  return (
        <DropdownMenu.DropdownMenuItem
            // @ts-expect-error ignore viewstyle error
            style={StyleSheet.flatten([
              styles.item,
              focused && { backgroundColor: focusBackgroundColor },
              { padding: theme.spacing.sm, borderRadius: theme.spacing.xs }
            ])}
            onFocus={onFocus}
            onBlur={onBlur}>
            {props.children}
        </DropdownMenu.DropdownMenuItem>
  )
};

interface DropdownProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  items: MenuItem[];
}

const Dropdown = ({ children, style, items }: DropdownProps): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const separatorColor =
        theme.theme === 'dark' ? theme.colors.borderLight : theme.colors.borderDark;

  useEffect(() => {
    const clickHandler = (e: MouseEvent): void => {
      const t = e.target;

      if (!open) return;
      if (t == null) return;
      if ((buttonRef.current == null) || (menuRef.current == null)) return;

      if (
        t !== buttonRef.current &&
                !buttonRef.current.contains(t as Node) &&
                t !== menuRef.current &&
                !menuRef.current.contains(t as Node)
      ) {
        e.preventDefault();
        e.stopPropagation();

        setOpen(false);
      }
    }

    const keydownHandler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }

    document.addEventListener('click', clickHandler, true);
    window.addEventListener('keydown', keydownHandler, true);
    return () => {
      document.removeEventListener('click', clickHandler, true);
      window.removeEventListener('keydown', keydownHandler, true);
    }
  }, [open, setOpen]);

  return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Pressable onPress={() => { setOpen(o => !o); }}
                    style={style}
                    ref={buttonRef as unknown as React.Ref<View>}
                    hitSlop={HITSLOP_10}>
                    {children}
                </Pressable>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    // @ts-expect-error ignore viewstyle error
                    style={StyleSheet.flatten([
                      styles.dropdown,
                      {
                        backgroundColor: theme.colors.primary_light,
                        borderRadius: theme.spacing.xs,
                        padding: theme.spacing.xs,
                        fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                      }])}
                    ref={menuRef} sideOffset={5}>
                    {items.map((item, index) => {
                      if (item.label === 'separator') {
                        return (
                                <DropdownMenu.Separator
                                key={item.label}
                                    // @ts-expect-error ignore viewstyle error
                                    style={StyleSheet.flatten([
                                      styles.separator,
                                      { backgroundColor: separatorColor }
                                    ])}>

                                </DropdownMenu.Separator>)
                      }

                      return (
                            <DropdownMenuItem onSelect={item.onPress} key={item.label}>
                                <Text>{item.label}</Text>
                                <Ionicons color={theme.colors.text} name={item.icon} size={item.iconSize} />
                            </DropdownMenuItem>
                      )
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root >
  );
};

const styles = StyleSheet.create({
  dropdown: {
    // @ts-expect-error web only
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 20px'
  },
  separator: {
    height: 1,
    marginTop: 4,
    marginBottom: 4
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 20
  }
});

export default Dropdown;
