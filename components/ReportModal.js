import { useContext, useState } from "react";
import {
	Modal,
	Pressable,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { Toast } from "toastify-react-native";
import fetchurl from "../scripts/fetchurl";
import CustomButton from "./CustomButton";
import ThemedText from "./ThemedText";
import { ThemeContext } from "../context/ThemeContext";
import styles from "../assets/style";
import { LanguageContext } from "../context/LanguageContext";

const ReportModal = ({ object = {}, postType = "", onModel = "Report" }) => {
	const [reportModal, setReportModal] = useState(false);

	const [rawFormData, setRawFormData] = useState({
		title: "",
		text: "",
	});

	const { title, text } = rawFormData;

	const [btnText, setBtnText] = useState("Submit");

	const sendReport = async () => {
		setBtnText("...");
		const res = await fetchurl(`/reports/${object._id}`, "POST", "no-cache", {
			...rawFormData,
			postType: postType,
			onModel: onModel,
			website: "YourSecretApp",
		});
		if (res.status === "error") {
			Toast.error(res.message, "bottom");
			setBtnText("Submit");
			setReportModal(false);
			return;
		}
		Toast.success("Report sent", "bottom");
		resetForm();
		setBtnText("Submit");
		setReportModal(false);
	};

	const resetForm = () => {
		setRawFormData({
			title: "",
			text: "",
		});
	};

	// Here goes the translation
	const { t } = useContext(LanguageContext);

	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	return (
		<>
			<Pressable onPress={() => setReportModal(true)}>
				<ThemedText
					type="default"
					style={{
						fontSize: 14,
						color: "#1DA1F2",
					}}
				>
					{t("main:reportSecretLink")}
				</ThemedText>
			</Pressable>
			<Modal
				animationType="slide"
				transparent={true}
				visible={reportModal}
				onRequestClose={() => {
					setReportModal(!reportModal);
				}}
			>
				<TouchableWithoutFeedback
					onPress={() => {
						setReportModal(false);
						resetForm();
					}}
				>
					<View
						style={[
							styles.modalCentered,
							{
								backgroundColor: isDark ? "#16181b" : "#FFF",
							},
						]}
					>
						<TouchableWithoutFeedback>
							<View style={[styles.modalContent]}>
								<ThemedText
									type="default"
									style={[
										{
											textAlign: "center",
											color: isDark ? "#FFF" : "#000",
										},
									]}
								>
									{t("report:reportingToLabel")} {object.title}
								</ThemedText>
								<ThemedText
									type="default"
									style={[
										{
											marginBottom: 15,
											textAlign: "center",
											color: isDark ? "#FFF" : "#000",
										},
									]}
								>
									- ({object._id}) -
								</ThemedText>
								<ThemedText
									type="default"
									style={[
										styles.labelText,
										{
											color: isDark ? "#FFF" : "#000",
										},
									]}
								>
									{t("report:reportingTitleLabel")}
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
									placeholder="Title"
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
									{t("report:reportingTextLabel")}
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
									placeholder="Here goes the message"
									keyboardType="default"
									multiline={true}
									numberOfLines={4}
								/>
								<View>
									<View style={[styles.fixToText, styles.mb3]}>
										<CustomButton
											title="Clear"
											onPress={resetForm}
											color="#000"
										/>
										<CustomButton
											title={btnText}
											onPress={sendReport}
											color="#000"
										/>
									</View>
									<CustomButton
										title="Cancel"
										onPress={() => setReportModal(false)}
										color="red"
									/>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	);
};

export default ReportModal;
