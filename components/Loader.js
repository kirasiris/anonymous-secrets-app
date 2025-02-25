import { ActivityIndicator, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";

const Loader = () => {
	// here goes the translation
	const { t } = useContext(LanguageContext);

	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	return (
		<View style={[styles.container]}>
			<ActivityIndicator size="large" />
			<ThemedText type="default" style={[{ color: isDark ? "#FFF" : "#000" }]}>
				{t("main:wakingUpServerLabel")}
			</ThemedText>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Loader;
