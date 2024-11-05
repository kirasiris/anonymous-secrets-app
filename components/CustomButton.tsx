import React from 'react';
import { Button, type TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ButtonBackgroundProps = TextProps & {
  title?: string;
  lightColor?: string;
  darkColor?: string;
  onPress?: () => void; // Use void as the return type for onPress
  style?: object;
};

export function CustomButton({
  title = '',
  lightColor,
  darkColor,
  onPress,
  style,
  ...otherProps
}: ButtonBackgroundProps) {
  
  // Get background color using your theme hook
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  // Return the Button component wrapped in the CustomButton
  return (
    <Button
      title={title}
      onPress={onPress}
      color={backgroundColor} // You can also pass the backgroundColor here
      {...otherProps}
    />
  );
}