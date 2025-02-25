import { Link, Stack } from "expo-router";
import { Dimensions, PixelRatio, ScrollView, View } from "react-native";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import SearchBar from "../../../components/SearchBar";
import styles from "../../../assets/style";
import CustomIcon from "../../../components/CustomIcon";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";

const SearchScreen = () => {
	// Get the font scale factor
	const scale = PixelRatio.getFontScale();

	// Define a font size based on scale factor
	const scaledFontSize = 16 * scale;

	// HERE GOES THE TRANSLATION
	const { t } = useContext(LanguageContext);

	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	// Get height screen height
	const ScreenHeight = Dimensions.get("window").height;

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: t("search:screenTitle"),
					headerTitleAlign: "left",
					headerTitleStyle: {
						fontSize: scaledFontSize, // Use scaled font size
						color: isDark ? "#FFF" : "#000",
					},
					headerStyle: {
						backgroundColor: isDark ? "#000" : "#FFF",
					},
					// headerLeft: () => <ThemedText>Example Left</ThemedText>,
					headerRight: () => (
						<Link href="/filter" style={[styles.filterIcon]}>
							<CustomIcon
								icon={faFilter}
								size={25}
								style={{
									color: isDark ? "#FFF" : "#000",
								}}
							/>
						</Link>
					),
				}}
			/>
			<ThemedView style={{ flex: 1 }}>
				<ScrollView
					contentContainerStyle={{
						backgroundColor: isDark ? "#16181b" : "#FFF",
						height: ScreenHeight,
					}}
				>
					<View style={[styles.container]}>
						<ThemedText
							type="default"
							style={[
								styles.labelText,
								{
									color: isDark ? "#FFF" : "#000",
								},
							]}
						>
							{t("search:searchLabel")}
						</ThemedText>
						<SearchBar />
					</View>
				</ScrollView>
			</ThemedView>
		</>
	);
};

export default SearchScreen;
