import { Link, Stack, useGlobalSearchParams } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
	PixelRatio,
	SectionList,
	View,
	RefreshControl,
	Dimensions,
} from "react-native";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import fetchurl from "../../../scripts/fetchurl";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ParseHtml from "../../../components/ParseHtml";
import Loader from "../../../components/Loader";
import styles from "../../../assets/style";
import CustomIcon from "../../../components/CustomIcon";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";

const ChangelogsScreen = () => {
	const searchParams = useGlobalSearchParams();

	const page = searchParams.page || 1;
	const limit = searchParams.limit || 50;
	const sort = searchParams.sort || "-createdAt";

	const [changelogs, setChangelogs] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchChangelogs = async (params = "", abortController) => {
		try {
			const res = await fetchurl(
				`/changelogs${params}&project=anonymous-secrets-app`, // url
				"GET", // method
				"default", // cache
				{}, // body
				abortController.signal, // signal
				false, // multipart
				false // is remote
			);

			const groupByDate = res?.data?.reduce((groups = [], changelog) => {
				const date = changelog.createdAt.split("T")[0];
				const existingGroup = groups.find((group) => group.title === date);
				if (!existingGroup) {
					groups.push({ title: date, data: [changelog] });
				} else {
					existingGroup.data.push(changelog);
				}
				return groups;
			}, []);

			setChangelogs(groupByDate);
		} catch (err) {
			console.log("Error fetching changelogs", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const abortController = new AbortController();

		fetchChangelogs(
			`?page=${page}&limit=${limit}&sort=${sort}`,
			abortController
		);

		return () => abortController.abort();
	}, [searchParams]);

	// Get the font scale factor
	const scale = PixelRatio.getFontScale();

	// Define a font size based on scale factor
	const scaledFontSize = 16 * scale;

	// Pull down to refresh
	const refreshContent = useCallback(() => {
		const abortController = new AbortController();

		fetchChangelogs(
			`?page=${page}&limit=${limit}&sort=${sort}`,
			abortController
		);

		return () => abortController.abort();
	}, []);

	// Here goes the translation
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
					title: t("changelogs:screenTitle"),
					headerTitleAlign: "left",
					headerTitleStyle: {
						fontSize: scaledFontSize, // Use scaled font size
						color: isDark ? "#FFF" : "#000",
					},
					headerStyle: {
						backgroundColor: isDark ? "#000" : "#FFF",
					},
					// headerLeft: () => <ThemedText type="default">Example left</ThemedText>,
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
			<ThemedView style={[{ flex: 1 }]}>
				<View
					style={[
						{
							paddingLeft: 15,
							backgroundColor: isDark ? "#16181b" : "#FFF",
							height: ScreenHeight,
						},
					]}
				>
					<ThemedText
						type="default"
						style={[styles.mb3, { color: isDark ? "#FFF" : "#000" }]}
					>
						{t("changelogs:screenDescription")}
					</ThemedText>
					{loading ? (
						<Loader />
					) : changelogs?.length > 0 ? (
						<SectionList
							sections={changelogs}
							keyExtractor={(item) => item._id.toString()}
							renderItem={({ item }) => (
								<View key={item._id} style={[styles.container]}>
									<ParseHtml text={item.text} />
								</View>
							)}
							renderSectionHeader={({ section: { title } }) => (
								<ThemedText
									type="default"
									style={{ color: isDark ? "#FFF" : "#000" }}
								>
									{title}
								</ThemedText>
							)}
							refreshControl={
								<RefreshControl
									refreshing={loading}
									onRefresh={refreshContent}
								/>
							}
							ListFooterComponent={<View style={{ height: 120 }} />} // Prevents cut-off
							style={{ flex: 1 }}
						/>
					) : (
						<View>
							<ThemedText type="default">NO CHANGELOGS YET</ThemedText>
						</View>
					)}
				</View>
			</ThemedView>
		</>
	);
};

export default ChangelogsScreen;
