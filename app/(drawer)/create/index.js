import { PixelRatio, ScrollView, Switch, TextInput, View } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import Dropdown from "react-native-input-select";
import { Toast } from "toastify-react-native";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import fetchurl from "../../../scripts/fetchurl";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import CustomButton from "../../../components/CustomButton";
import styles from "../../../assets/style";
import CustomIcon from "../../../components/CustomIcon";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext } from "../../../context/LanguageContext";

const CreateScreen = () => {
	const router = useRouter();

	const [rawFormData, setRawFormData] = useState({
		title: "",
		text: "",
		password: "",
		age: 13,
		sex: "",
		state: "",
		nsfw: false,
		deletable: false,
	});

	const { title, text, password, age, sex, state, nsfw, deletable } =
		rawFormData;

	const [btnText, setBtnText] = useState("Submit");

	const sendSecret = async () => {
		setBtnText("...");
		const res = await fetchurl(
			`/extras/secrets`,
			"POST",
			"no-cache",
			rawFormData
		);
		if (res.status === "error") {
			Toast.error(res.message, "bottom");
			setBtnText("Submit");
			return;
		}
		Toast.success("Secret created", "bottom");
		resetForm();
		setBtnText("Submit");
		router.push(`/home/read/${res?.data?._id}`);
	};

	const resetForm = () => {
		setRawFormData({
			title: "",
			text: "",
			password: "",
			age: 13,
			sex: "",
			state: "",
			nsfw: false,
			deletable: false,
		});
	};

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
					title: t("create:screenTitle"),
					headerTitleAlign: "left",
					headerTitleStyle: {
						fontSize: scaledFontSize, // Use scaled font size
						color: isDark ? "#FFF" : "#000",
					},
					headerStyle: {
						backgroundColor: isDark ? "#000" : "#FFF",
					},
					// headerLeft: () => <Link href={`/`} style={[styles.filterIcon, { color: '#FFF' } ]}>Home</Link>,
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
							{t("create:nameLabel")}
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
									title: e,
								});
							}}
							value={title}
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
							{t("create:textLabel")}
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
							placeholder="Type here"
							keyboardType="default"
							multiline={true}
							numberOfLines={4}
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
							{t("create:passwordLabel")}
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
									password: e,
								});
							}}
							value={password}
							placeholder="********"
							secureTextEntry={true}
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
							{t("create:ageLabel")}
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
								const myNumber = parseInt(e.replace(/[^0-9]/g, ""), 10);
								if (isNaN(myNumber)) return 13;
								setRawFormData({
									...rawFormData,
									age: myNumber,
								});
							}}
							value={age}
							placeholder="13"
							keyboardType="numeric"
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
							{t("create:sexLabel")}
						</ThemedText>
						<Dropdown
							label={undefined}
							placeholder="Choose an option"
							options={[
								{ label: "Male", value: "male" },
								{ label: "Female", value: "female" },
								{ label: "Non-binary", value: "non-binary" },
							]}
							selectedValue={sex}
							onValueChange={(e) => {
								setRawFormData({
									...rawFormData,
									sex: e,
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
							{t("create:stateLabel")}
						</ThemedText>
						<Dropdown
							label={undefined}
							placeholder="Choose an option"
							options={[
								{ label: "Alabama", value: "AL" },
								{ label: "Alaska", value: "AK" },
								{ label: "Arizona", value: "AZ" },
								{ label: "Arkansas", value: "AR" },
								{ label: "California", value: "CA" },
								{ label: "Colorado", value: "CO" },
								{ label: "Connecticut", value: "CT" },
								{ label: "Delaware", value: "DE" },
								{ label: "Florida", value: "FL" },
								{ label: "Georgia", value: "GA" },
								{ label: "Hawaii", value: "HI" },
								{ label: "Idaho", value: "ID" },
								{ label: "Illinois", value: "IL" },
								{ label: "Indiana", value: "IN" },
								{ label: "Iowa", value: "IA" },
								{ label: "Kansas", value: "KS" },
								{ label: "Kentucky", value: "KY" },
								{ label: "Louisiana", value: "LA" },
								{ label: "Maine", value: "ME" },
								{ label: "Maryland", value: "MD" },
								{ label: "Massachusetts", value: "MA" },
								{ label: "Michigan", value: "MI" },
								{ label: "Minnesota", value: "MN" },
								{ label: "Mississippi", value: "MS" },
								{ label: "Missouri", value: "MO" },
								{ label: "Montana", value: "MT" },
								{ label: "Nebraska", value: "NE" },
								{ label: "Nevada", value: "NV" },
								{ label: "New Hampshire", value: "NH" },
								{ label: "New Jersey", value: "NJ" },
								{ label: "New Mexico", value: "NM" },
								{ label: "New York", value: "NY" },
								{ label: "North Carolina", value: "NC" },
								{ label: "North Dakota", value: "ND" },
								{ label: "Ohio", value: "OH" },
								{ label: "Oklahoma", value: "OK" },
								{ label: "Oregon", value: "OR" },
								{ label: "Pennsylvania", value: "PA" },
								{ label: "Rhode Island", value: "RI" },
								{ label: "South Carolina", value: "SC" },
								{ label: "South Dakota", value: "SD" },
								{ label: "Tennessee", value: "TN" },
								{ label: "Texas", value: "TX" },
								{ label: "Utah", value: "UT" },
								{ label: "Vermont", value: "VT" },
								{ label: "Virginia", value: "VA" },
								{ label: "Washington", value: "WA" },
								{ label: "West Virginia", value: "WV" },
								{ label: "Wisconsin", value: "WI" },
								{ label: "Wyoming", value: "WY" },
								{ label: "District of Columbia", value: "DC" },
								{ label: "American Samoa", value: "AS" },
								{ label: "Guam", value: "GU" },
								{ label: "Northern Mariana Islands", value: "MP" },
								{ label: "Puerto Rico", value: "PR" },
								{ label: "Johnston Atoll Island", value: "JA-UM" },
								{ label: "Midway Island", value: "MI-UM" },
								{ label: "Wake Island", value: "WI-UM" },
								{ label: "Virgin Islands, U.S.", value: "VI" },
							]}
							selectedValue={state}
							onValueChange={(e) => {
								setRawFormData({
									...rawFormData,
									state: e,
								});
							}}
							dropdownStyle={{
								borderRadius: 0,
								color: isDark ? "#FFF" : "#000",
							}}
							isSearchable={true}
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
							{t("create:nsfwLabel")}
						</ThemedText>
						<Switch
							trackColor={{
								true: "#81b0ff",
								false: "#767577",
							}}
							thumbColor={nsfw ? "#f5dd4b" : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							value={nsfw}
							onValueChange={(e) => {
								setRawFormData({
									...rawFormData,
									nsfw: e,
								});
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
							{t("create:delete24hrsLabel")}
						</ThemedText>
						<Switch
							trackColor={{
								true: "#81b0ff",
								false: "#767577",
							}}
							thumbColor={deletable ? "#f5dd4b" : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							value={deletable}
							onValueChange={(e) => {
								setRawFormData({
									...rawFormData,
									deletable: e,
								});
							}}
						/>
						<View style={[styles.fixToText, { marginBottom: 5 }]}>
							<CustomButton title="Clear" onPress={resetForm} color="#000" />
							<CustomButton title={btnText} onPress={sendSecret} color="#000" />
						</View>
					</View>
				</ScrollView>
			</ThemedView>
		</>
	);
};
export default CreateScreen;
