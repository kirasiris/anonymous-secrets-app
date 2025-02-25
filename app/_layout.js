import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import ToastManager from "toastify-react-native";
import ThemeProvider from "../context/ThemeContext";
import LanguageProvider from "../context/LanguageContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = ({}) => {
	// color scheme

	// load font
	const [loaded] = useFonts({
		SpaceMono: require(`../assets/fonts/SpaceMono-Regular.ttf`),
	});

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
	}, [loaded]);

	if (!loaded) return null;

	// Orientation

	return (
		<ThemeProvider>
			<LanguageProvider>
				<Stack>
					<Stack.Screen name="(drawer)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style="auto" />
				<ToastManager />
			</LanguageProvider>
		</ThemeProvider>
	);
};

export default RootLayout;
