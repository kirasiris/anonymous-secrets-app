import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { I18nextProvider } from 'react-i18next';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import i18n from '@/i18n'
import { LanguageProvider } from '@/hooks/useLanguage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // // Orientation
  // const [orientation, setOrientation] = useState({});

  // useEffect(() => {
  //   const getOrientation = async () => {
  //     const current = await ScreenOrientation.getOrientationAsync();
  //     const lock = await ScreenOrientation.getOrientationLockAsync();

  //     setOrientation({
  //       value: current,
  //       lock: lock
  //     });
  //   }
  //   getOrientation();

  //   // Listener for orientation change
  //   const orientationChangeSub = ScreenOrientation.addOrientationChangeListener(orientationChanged);

  //   return () => {
  //     ScreenOrientation.removeOrientationChangeListener(orientationChangeSub);
  //   }
  // }, []);

  // const orientationChanged = (result: any) => {
  //   setOrientation({
  //     value: result.orientationInfo.orientation,
  //     lock: result.orientationLock
  //   })
  // }

  // // lock/unlock orientation
  // // let buttonLayout = styles.row
  // if(orientation && (orientation.value === ScreenOrientation.Orientation.PORTRAIT_UP || orientation.value === ScreenOrientation.Orientation.PORTRAIT_DOWN)) {
  //   // buttonLayout = styles.column;
  //   console.log('Orientation', orientation.value)
  // }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          <ToastManager />
        </LanguageProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
}
