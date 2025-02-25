import { Link, Stack } from "expo-router";
import { useContext, useState } from "react";
import { Dimensions, TextInput } from "react-native";
import { PixelRatio, ScrollView, View } from "react-native";
import { Toast } from "toastify-react-native";
import Dropdown from "react-native-input-select";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import fetchurl from "../../../scripts/fetchurl";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import CustomButton from "../../../components/CustomButton";
import styles from "../../../assets/style";
import CustomIcon from "../../../components/CustomIcon";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";

const ContactScreen = () => {
	const [rawFormData, setRawFormData] = useState({
		name: "",
		email: "",
		subject: "",
		text: "",
	});

	const { name, email, subject, text } = rawFormData;

	const [btnText, setBtnText] = useState("Submit");

	const sendEmail = async () => {
		setBtnText("...");
		const res = await fetchurl(
			`/emails`, // url
			"POST", // method
			"default", // cache
			rawFormData, // body
			undefined, // signal
			false, // multipart
			false // is remote
		);
		if (res.status === "error") {
			Toast.error(res.message, "bottom");
			setBtnText("Submit");
			return;
		}
		Toast.success("Email sent", "bottom");
		resetForm();
		setBtnText("Submit");
	};

	const resetForm = () => {
		setRawFormData({
			name: "",
			email: "",
			subject: "",
			text: "",
		});
	};

	// Get the font scale factor
	const scale = PixelRatio.getFontScale();

	// Define a font size based on scale factor
	const scaledFontSize = 16 * scale;

	// translation goes here
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
					title: t("contact:screenTitle"),
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
							{t("contact:nameLabel")}
						</ThemedText>
						<TextInput
							style={[
								styles.formControl,
								styles.mb3,
								{
									backgroundColor: "#FFF",
								},
							]}
							onChangeText={(e) => {
								setRawFormData({
									...rawFormData,
									name: e,
								});
							}}
							value={name}
							placeholder="John Doe"
							keyboardType="default"
						/>
						<ThemedText
							type="default"
							style={[
								styles.labelText,
								{
									color: isDark ? "#FFF" : "#000",
								},
							]}
						>
							{t("contact:emailLabel")}
						</ThemedText>
						<TextInput
							style={[
								styles.formControl,
								styles.mb3,
								{
									backgroundColor: "#FFF",
								},
							]}
							onChangeText={(e) => {
								setRawFormData({
									...rawFormData,
									email: e,
								});
							}}
							value={email}
							placeholder="john@doe.com"
							keyboardType="email-address"
						/>
						<ThemedText
							type="default"
							style={[
								styles.labelText,
								{
									color: isDark ? "#FFF" : "#000",
								},
							]}
						>
							{t("contact:subjectLabel")}
						</ThemedText>
						<Dropdown
							label={undefined}
							placeholder={"Select an option"}
							options={[
								{ label: "Suggestion", value: "suggestion" },
								{ label: "Bug", value: "bug" },
								{ label: "Review", value: "review" },
								{ label: "Greetings", value: "greetings" },
							]}
							selectedValue={subject}
							onValueChange={(e) => {
								setRawFormData({
									...rawFormData,
									subject: e,
								});
							}}
							dropdownStyle={{
								borderRadius: 0,
							}}
						/>
						<ThemedText
							type="default"
							style={[
								styles.labelText,
								{
									color: isDark ? "#FFF" : "#000",
								},
							]}
						>
							{t("contact:messageLabel")}
						</ThemedText>
						<TextInput
							style={[
								styles.formControl,
								styles.mb3,
								{
									backgroundColor: "#FFF",
								},
							]}
							onChangeText={(e) => {
								setRawFormData({
									...rawFormData,
									text: e,
								});
							}}
							value={text}
							placeholder={"Type here"}
							keyboardType="default"
							multiline={true}
							numberOfLines={4}
						/>
						<View style={[styles.fixToText, { marginBottom: 5 }]}>
							<CustomButton title="Clear" onPress={resetForm} color="#000" />
							<CustomButton title={btnText} onPress={sendEmail} color="#000" />
						</View>
					</View>
				</ScrollView>
			</ThemedView>
		</>
	);
};

export default ContactScreen;
