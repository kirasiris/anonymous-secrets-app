import {
	VirtualizedList,
	View,
	PixelRatio,
	RefreshControl,
} from "react-native";
import { Link, Stack, useGlobalSearchParams } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import fetchurl from "../../../scripts/fetchurl";
import ThemedText from "../../../components/ThemedText";
import Loader from "../../../components/Loader";
import styles from "../../../assets/style";
import SearchBar from "../../../components/SearchBar";
import ThemedView from "../../../components/ThemedView";
import Single from "../../../components/secrets/Single";
import CustomIcon from "../../../components/CustomIcon";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";

const HomeScreen = ({}) => {
	const searchParams = useGlobalSearchParams();

	const page = searchParams.page || 1;
	const limit = searchParams.limit || 50;
	const sort = searchParams.sort || "-createdAt";
	const sex = searchParams.sex ? `&sex=${searchParams.sex}` : "";
	const age = searchParams.age ? `&age[gte]=${searchParams.age}` : "";
	const secondaryage = searchParams.secondaryage
		? `&age[lte]=${searchParams.secondaryage}`
		: "";
	const nsfw = searchParams.nsfw === "true" ? `&nsfw=${searchParams.nsfw}` : "";
	const estate = searchParams.estate ? `&state=${searchParams.estate}` : "";

	const [secrets, setSecrets] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchSecrets = async (params = "", abortController) => {
		try {
			const res = await fetchurl(
				`/extras/secrets${params}`.replace(/&_=\d+/, ""), // url
				"GET", // method
				"default", // cache
				{}, // body
				abortController.signal, // signal
				false, // multipart
				false // is remote
			);

			setSecrets(res.data);
		} catch (err) {
			console.error("Error fetching secrets:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const abortController = new AbortController();

		fetchSecrets(
			`?page=${page}&limit=${limit}&sort=${sort}${sex}${age}${secondaryage}${nsfw}${estate}&decrypt=true&select=+title,+slug,+text,+password,+age,+sex,+state,+nsfw,+deletable,+commented,+tags,+status,+createdAt,+updatedAt`,
			abortController
		);

		return () => abortController.abort();
	}, [sex, age, secondaryage, nsfw, estate]);

	const getItem = (data = [], index = Number) => data[index];

	const getItemCount = (data = []) => data.length;

	// Get the font scale factor
	const scale = PixelRatio.getFontScale();

	// Define a font size based on scale factor
	const scaledFontSize = 16 * scale; // Default font size of 16sp

	// here goes the translation
	const { t } = useContext(LanguageContext);

	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	// Prevent going back -- This is a hack to solve the "The specified child already has a parent. You must use removeView() in the parent component first." issue
	// Not at all recommended for the long run
	// To delete once a better solution is available or once react-navagation solves it.

	// Pull down to refresh
	const refreshContent = useCallback(() => {
		const abortController = new AbortController();

		fetchSecrets(
			`?page=${page}&limit=${limit}&sort=${sort}${sex}${age}${secondaryage}${nsfw}${estate}&decrypt=true&select=+title,+slug,+text,+password,+age,+sex,+state,+nsfw,+deletable,+commented,+tags,+status,+createdAt,+updatedAt`,
			abortController
		);

		return () => abortController.abort();
	}, []);

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: t("home:screenTitle"),
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
			<SearchBar />
			<ThemedView style={{ flex: 1 }}>
				{loading ? (
					<Loader />
				) : secrets?.length > 0 ? (
					<VirtualizedList
						data={secrets}
						initialNumToRender={50}
						renderItem={({ item }) => (
							<Single key={item._id} object={item} isSingle={false} />
						)}
						keyExtractor={(item) => item._id.toString()}
						getItemCount={getItemCount}
						getItem={getItem}
						refreshControl={
							<RefreshControl refreshing={loading} onRefresh={refreshContent} />
						}
					/>
				) : (
					<View style={styles.card}>
						{/* User info section */}
						<View style={styles.cardInfo}>
							{/* HERE GOES THE SEX */}
							{/* DETAILS */}
							<View style={styles.cardDetails}>
								<View style={styles.cardTitleContainer}>
									<ThemedText style={[styles.cardTitle]}>ADMIN</ThemedText>
								</View>
							</View>
						</View>
						<ThemedText type="default" style={[styles.cardText]}>
							{t("main:withoutSecretsLabel")}
						</ThemedText>
					</View>
				)}
			</ThemedView>
		</>
	);
};

export default HomeScreen;
