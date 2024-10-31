// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export function FontAwesomeIcon({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: IconProps<ComponentProps<typeof FontAwesome>['name']> & {
  lightColor?: string;
  darkColor?: string;
}) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  return <FontAwesome size={28} color={color} style={[style]} {...otherProps} />;
}