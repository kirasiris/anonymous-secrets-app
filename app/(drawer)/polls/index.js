import { View, PixelRatio, VirtualizedList, Dimensions } from "react-native";
import { Link, Stack, useGlobalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import fetchurl from "../../../scripts/fetchurl";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import Loader from "../../../components/Loader";
import ParseHtml from "../../../components/ParseHtml";
import styles from "../../../assets/style";
import CustomIcon from "../../../components/CustomIcon";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";

const PollsScreen = () => {
	const searchParams = useGlobalSearchParams();

	const page = searchParams.page || 1;
	const limit = searchParams.limit || 50;
	const sort = searchParams.sort || "-createdAt";

	const [polls, setPolls] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchPolls = async (params = "") => {
			try {
				const res = await fetchurl(
					`/polls${params}`, // url
					"GET", // method
					"default", // cache
					{}, // body
					abortController.signal, // signal
					false, // multipart
					false // is remote
				);

				setPolls(res.data);
			} catch (err) {
				console.log("Error fetching polls", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPolls(`?page=${page}&limit=${limit}&sort=${sort}&decrypt=true`);

		return () => abortController.abort();
	}, [searchParams]);

	const getItem = (data = [], index = Number) => data[index];

	const getItemCount = (data = []) => data.length;

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
	const ScreenHeight = Dimensions.get("window").height;

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: t("polls:screenTitle"),
					headerTitleAlign: "left",
					headerTitleStyle: {
						fontSize: scaledFontSize, // Use scaled font size
						color: isDark ? "#FFF" : "#000",
					},
					headerStyle: {
						backgroundColor: isDark ? "#000" : "#FFF",
					},
					// headerLeft: () => <Text>Example Left</Text>,
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
			<ThemedView style={{ flex: 1 }}>
				<View
					style={[
						{
							backgroundColor: isDark ? "#16181b" : "#FFF",
							height: ScreenHeight,
						},
					]}
				>
					{loading ? (
						<Loader />
					) : polls?.length > 0 ? (
						<VirtualizedList
							data={polls}
							initialNumToRender={50}
							renderItem={({ item }) => (
								<View key={item._id} style={[styles.container]}>
									<Link href={`/polls/read/${item._id}`}>
										<ThemedText type="link">{item.title}</ThemedText>
									</Link>
									<ParseHtml text={item.text} />
								</View>
							)}
							keyExtractor={(item) => item._id.toString()}
							getItemCount={getItemCount}
							getItem={getItem}
						/>
					) : (
						<View style={[styles.card]}>
							{/* User info section */}
							<View style={[styles.cardInfo]}>
								{/* HERE GOES THE SEX */}
								{/* DETAILS */}
								<View style={[styles.cardDetails]}>
									<View style={[styles.cardTitleContainer]}>
										<ThemedText
											type="defaultSemiBold"
											style={[styles.cardTitle]}
										>
											ADMIN
										</ThemedText>
									</View>
								</View>
							</View>
							<ThemedText type="default" style={[styles.cardText]}>
								NO QUESTIONS YET
							</ThemedText>
						</View>
					)}
				</View>
			</ThemedView>
		</>
	);
};

export default PollsScreen;
