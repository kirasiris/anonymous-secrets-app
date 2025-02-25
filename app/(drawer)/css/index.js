import { useContext, useEffect, useState } from "react";
import { PixelRatio, ScrollView, View } from "react-native";
import { Link, Stack } from "expo-router";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import fetchurl from "../../../scripts/fetchurl";
import formatDateWithoutTime from "../../../scripts/formatdatewithoutime";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ParseHtml from "../../../components/ParseHtml";
import Loader from "../../../components/Loader";
import styles from "../../../assets/style";
import CustomIcon from "../../../components/CustomIcon";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";

const ChildSafetyStandardScreen = () => {
	const [cssPage, setCSSPage] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchPage = async () => {
			try {
				const res = await fetchurl(
					`/pages/${process.env.EXPO_PUBLIC_CHILD_SAFETY_STANDARDS_PAGE_ID}`, // url
					"GET", // method
					"no-cache", // cache
					{}, // body
					abortController.signal, // signal
					false, // multipart
					false // is remote
				);
				setCSSPage(res.data);
			} catch (err) {
				console.log("Error fetching page:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPage();

		return () => abortController.abort();
	}, []);

	// Get the font scale factor
	const scale = PixelRatio.getFontScale();

	// Define a font size based on scale factor
	const scaledFontSize = 16 * scale;

	// here goes the translation
	const { t } = useContext(LanguageContext);

	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	// Get height screen height

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: t("css:screenTitle"),
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
						<Link href={`/filter`} style={[styles.filterIcon]}>
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
			<ThemedView style={[{ flex: 1 }]}>
				<ScrollView
					contentContainerStyle={{
						backgroundColor: isDark ? "#16181b" : "#FFF",
						// height: ScreenHeight, // not height required
					}}
				>
					<View style={[styles.container]}>
						{loading ? (
							<Loader />
						) : (
							cssPage !== undefined &&
							cssPage !== null &&
							cssPage !== "" && (
								<>
									<ThemedText
										type="default"
										style={{
											color: isDark ? "#FFF" : "#000",
										}}
									>
										Published on {formatDateWithoutTime(cssPage.createdAt)} by{" "}
										{cssPage.user?.username}
									</ThemedText>
									<ParseHtml text={cssPage.text} />
								</>
							)
						)}
					</View>
				</ScrollView>
			</ThemedView>
		</>
	);
};

export default ChildSafetyStandardScreen;
