import {
	Link,
	Stack,
	useGlobalSearchParams,
	useLocalSearchParams,
} from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, PixelRatio, View, VirtualizedList } from "react-native";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import fetchurl from "../../../../scripts/fetchurl";
import Loader from "../../../../components/Loader";
import ThemedView from "../../../../components/ThemedView";
import ThemedText from "../../../../components/ThemedText";
import ParseHtml from "../../../../components/ParseHtml";
import styles from "../../../../assets/style";
import CustomIcon from "../../../../components/CustomIcon";
import { ThemeContext } from "../../../../context/ThemeContext";
import { LanguageContext } from "../../../../context/LanguageContext";

const ReadPollScreen = () => {
	const searchParams = useGlobalSearchParams();
	const params = useLocalSearchParams();

	const [pollquestions, setPollQuestions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchPollQuestions = async (params = "") => {
			try {
				const res = await fetchurl(
					`/questions${params}`, // url
					"GET", // method
					"default", // cache
					{}, // body
					abortController.signal, // signal
					false, // multipart
					false // is remote
				);

				setPollQuestions(res.data);
			} catch (err) {
				console.log("Error fetching questions:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPollQuestions(`?resourceId=${params.id}&onModel=Poll&decrypt=true`);

		return () => abortController.abort();
	}, [loading]);

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
					title: t("main:readingTitleScreen"),
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
					style={{
						backgroundColor: isDark ? "#16181b" : "#FFF",
						height: ScreenHeight,
					}}
				>
					{loading ? (
						<Loader />
					) : pollquestions?.length > 0 ? (
						<VirtualizedList
							data={pollquestions}
							initialNumToRender={50}
							renderItem={({ item }) => (
								<View key={item._id} style={[styles.container]}>
									<Link href={`/polls/question/${item._id}`}>
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
								NO QUESTIONS YET LOL
							</ThemedText>
						</View>
					)}
				</View>
			</ThemedView>
		</>
	);
};
export default ReadPollScreen;
