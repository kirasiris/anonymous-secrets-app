import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { PixelRatio, ScrollView, View } from "react-native";
import { Toast } from "toastify-react-native";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import fetchurl from "../../../../scripts/fetchurl";
import Loader from "../../../../components/Loader";
import VerifyPassword from "../../../../components/VerifyPassword";
import ThemedView from "../../../../components/ThemedView";
import Single from "../../../../components/secrets/Single";
import SingleComment from "../../../../components/comments/Single";
import CustomIcon from "../../../../components/CustomIcon";
import styles from "../../../../assets/style";
import ThemedText from "../../../../components/ThemedText";
import CommentFormModal from "../../../../components/CommentFormModal";
import { ThemeContext } from "../../../../context/ThemeContext";
import { LanguageContext } from "../../../../context/LanguageContext";

export default function ReadSecretScreen() {
	const router = useRouter();

	const [secret, setSecret] = useState({});
	const [loading, setLoading] = useState(true);
	const params = useLocalSearchParams();

	useEffect(() => {
		const abortController = new AbortController();

		const fetchSecret = async () => {
			try {
				const res = await fetchurl(
					`/extras/secrets/${params.id}`, // url
					"GET", // method
					"no-cache", // cache
					{}, // body
					abortController.signal, // signal
					false, // multipart
					false // is remote
				);

				// If error loading secret, or secret is not found, redirect back to homepage!
				if (res.status === "error") {
					Toast.error(res.message, "bottom");
					router.navigate("/");
					return;
				}

				setSecret(res.data);
			} catch (err) {
				console.log("Error fetching secret:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchSecret();

		return () => abortController.abort();
	}, [params.id]);

	// Comments
	const [comments, setComments] = useState([]);

	// const [btnText, setBtnText] = useState("Submit");

	const [loadingComments, setLoadingComments] = useState(true);

	const fetchComments = async (cparams, abortController) => {
		try {
			const res = await fetchurl(
				`/comments${cparams}&sort=-createdAt&status=published&decrypt=true`, // url
				"GET", // method
				"default", // cache
				{}, // body
				abortController.signal, // signal
				false, // multipart
				false // is remote
			);

			// If error loading comments, or comments are not found, redirect back to homepage!
			if (res.status === "error") {
				Toast.error(res.message, "bottom");
				setComments([]);
			}

			setComments(res.data);
		} catch (err) {
			console.log("Error fetching comments:", err);
		} finally {
			setLoadingComments(false);
		}
	};

	useEffect(() => {
		const abortController = new AbortController();

		fetchComments(`?resourceId=${params.id}`, abortController);

		return () => abortController.abort();
	}, [params.id]);

	// Get the font scale factor
	const scale = PixelRatio.getFontScale();

	// Define a font size based on scale factor
	const scaledFontSize = 16 * scale;

	// Here goes the translation
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
					title: t("main:readingTitleScreen"),
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
			<ThemedView style={{ flex: 1 }}>
				<ScrollView
					contentContainerStyle={{
						backgroundColor: isDark ? "#16181b" : "#FFF",
						// height: ScreenHeight, // not height required
					}}
				>
					<View style={[styles.container, { marginHorizontal: 0 }]}>
						{loading ? (
							<Loader />
						) : secret !== undefined &&
						  secret !== null &&
						  secret !== "" &&
						  secret.password !== undefined &&
						  secret.password !== null &&
						  secret.password !== "" ? (
							<VerifyPassword
								objectId={params.id}
								password={secret.password}
								setObject={setSecret}
							/>
						) : (
							<>
								<Single object={secret} isSingle={true} />
								<CommentFormModal
									paramId={params.id}
									object={secret}
									fetchObjects={fetchComments}
								/>
								{/* HERE GOES THE COMMENTS SECTION */}
								<ThemedText
									type="subtitle"
									style={{
										color: isDark ? "#FFF" : "#000",
										marginLeft: 10,
									}}
								>
									{t("main:commentsLabel")} ({comments?.length || 0})
								</ThemedText>

								{loadingComments ? (
									<Loader />
								) : comments?.length > 0 ? (
									comments?.map((comment) => (
										<SingleComment key={comment._id} object={comment} />
									))
								) : (
									<ThemedText
										type="defaultSemiBold"
										style={[
											{
												marginHorizontal: 15,
												marginVertical: 15,
												textAlign: "center",
												color: isDark ? "#FFF" : "#000",
											},
										]}
									>
										{t("main:withoutCommentsLabel")}
									</ThemedText>
								)}
							</>
						)}
					</View>
				</ScrollView>
			</ThemedView>
		</>
	);
}
