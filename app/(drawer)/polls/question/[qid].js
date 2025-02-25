import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
	Dimensions,
	PixelRatio,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { Toast } from "toastify-react-native";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import fetchurl from "../../../../scripts/fetchurl";
import Loader from "../../../../components/Loader";
import styles from "../../../../assets/style";
import ThemedView from "../../../../components/ThemedView";
import ThemedText from "../../../../components/ThemedText";
import CustomIcon from "../../../../components/CustomIcon";
import { ThemeContext } from "../../../../context/ThemeContext";
import { LanguageContext } from "../../../../context/LanguageContext";

export default function ReadQuestionScreen() {
	const router = useRouter();

	const [question, setQuestion] = useState({});
	const [loading, setLoading] = useState(true);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [ipAddress, setIpAddress] = useState({});
	const params = useLocalSearchParams();

	useEffect(() => {
		const abortController = new AbortController();

		const fetchQuestion = async () => {
			try {
				const res = await fetchurl(
					`/questions/${params.qid}`, // url
					"GET", // method
					"no-cache", // cache
					{}, // body
					abortController.signal, // signal
					false, // multipart
					false // is remote
				);

				if (res.status === "error") {
					Toast.error(res.message, "bottom");
					router.navigate(`/polls`);
					return;
				}

				setQuestion(res.data);
			} catch (err) {
				console.log("Error fetching question:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchQuestion();

		return () => abortController.abort();
	}, [params.qid]);

	// Get the font scale factor
	const scale = PixelRatio.getFontScale();

	// Define a font size based on scale factor
	const scaledFontSize = 16 * scale;

	// here goes the translation
	const { t } = useContext(LanguageContext);

	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	// Fetch IP Address
	useEffect(() => {
		const abortController = new AbortController();

		const fetchIpAddress = async () => {
			try {
				const res = await fetchurl(
					`https://api.ipify.org?format=json`, // url
					"GET", // method
					"default", // cache
					{}, // body
					abortController.signal, // signal
					false, // multipart
					true // is remote
				);

				setIpAddress(res);
			} catch (err) {
				console.log("Error fetching ip adress:", err);
			}
		};

		fetchIpAddress();

		return () => abortController.abort();
	}, [params.qid]);

	// Cast a vote
	const castVote = async (answer) => {
		const res = await fetchurl(
			`/polls/${question.resourceId}/question/${params.qid}/vote`, // url
			"PUT", // method
			"default", // cache
			{ optionKey: answer }, // body
			undefined, // signal
			false, // multipart
			false // is remote
		);

		if (res.status === "error") {
			Toast.error(res.message, "bottom");
			return;
		}
		Toast.success("Vote sent", "bottom");

		setSelectedAnswer(answer);
	};

	useEffect(() => {
		if (Platform.OS === "web") {
			router.push(`/polls`);
		}
	}, [params.qid]);

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
				<ScrollView
					contentContainerStyle={{
						backgroundColor: isDark ? "#16181b" : "#FFF",
						height: ScreenHeight,
					}}
				>
					{loading ? (
						<Loader />
					) : (
						question !== undefined &&
						question !== null &&
						question !== "" && (
							<View style={[styles.container]}>
								<ThemedText
									type="default"
									style={{
										color: isDark ? "#FFF" : "#000",
									}}
								>
									{question.text}
								</ThemedText>
								<ThemedText
									type="default"
									style={{
										color: isDark ? "#FFF" : "#000",
									}}
								>
									{question.resourceId}
								</ThemedText>
								{/* Display answers */}
								{Object.entries(question.answers).map(([key, answer]) => {
									// Check if the user has voted already
									const ipAddressHasVoted = answer.voters.some(
										(voter) => voter.ip === ipAddress?.ip
									);
									return (
										<TouchableOpacity
											key={key}
											style={[
												customstyles.answerButton,
												selectedAnswer === key || ipAddressHasVoted
													? customstyles.selectedButton
													: null,
											]}
											onPress={() => castVote(key)}
											disabled={selectedAnswer || ipAddressHasVoted}
										>
											<ThemedText type="default">{answer.text}</ThemedText>
											<ThemedText
												type="default"
												style={[customstyles.voteCount]}
											>
												Votes: {answer.votes}
											</ThemedText>
										</TouchableOpacity>
									);
								})}
							</View>
						)
					)}
				</ScrollView>
			</ThemedView>
		</>
	);
}

const customstyles = StyleSheet.create({
	questionText: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	answerButton: {
		backgroundColor: "#007bff",
		padding: 15,
		marginVertical: 10,
		borderRadius: 10,
		alignItems: "center",
		width: "100%",
	},
	selectedButton: {
		backgroundColor: "#4caf50",
	},
	voteCount: {
		fontSize: 14,
		color: "#ffffff",
		marginTop: 5,
	},
});
