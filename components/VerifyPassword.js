import { useContext, useState } from "react";
import fetchurl from "../scripts/fetchurl";
import { Toast } from "toastify-react-native";
import { Dimensions, TextInput, View } from "react-native";
import ThemedText from "./ThemedText";
import CustomButton from "./CustomButton";
import styles from "../assets/style";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

const VerifyPassword = ({
	objectId = "",
	password = "",
	setObject = () => {},
}) => {
	const [rawFormData, setRawFormData] = useState({
		confirmsecretpassword: "",
	});

	const { confirmsecretpassword } = rawFormData;

	const [btnText, setBtnText] = useState("Submit");

	const sendPassword = async (e) => {
		setBtnText("...");
		const res = await fetchurl(
			`/extras/secrets/${objectId}/confirmsecretpassword`, //url
			"POST", // method
			"default", // cache
			rawFormData, // body
			undefined, // signal
			false, // multipart
			false // is remote
		);
		if (res.status === "error" || res.status === "fail") {
			Toast.error(res.message, "bottom");
			setBtnText("Submit");
			return;
		}
		Toast.success("Secret revealed", "bottom");
		resetForm();
		setObject(res.data);
	};

	const resetForm = () => {
		setRawFormData({
			confirmsecretpassword: password,
		});
	};

	// here goes the translation
	const { t } = useContext(LanguageContext);

	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	return (
		<View
			style={[styles.container, { height: Dimensions.get("window").height }]}
		>
			<ThemedText type="default" style={[{ color: isDark ? "#FFF" : "#000" }]}>
				{t("main:passwordRequiredLabel")}
			</ThemedText>
			<TextInput
				style={[
					{},
					styles.formControl,
					styles.mb3,
					{
						backgroundColor: "#FFF",
					},
				]}
				onChangeText={(e) => {
					setRawFormData({
						...rawFormData,
						confirmsecretpassword: e,
					});
				}}
				value={confirmsecretpassword}
				placeholder="Type password to reveal secret"
				keyboardType="default"
				secureTextEntry={true}
			/>
			<View style={[styles.fixToText, { marginBottom: 5 }]}>
				<CustomButton title="Clear" onPress={resetForm} color="#000" />
				<CustomButton title={btnText} onPress={sendPassword} color="#000" />
			</View>
		</View>
	);
};

export default VerifyPassword;
