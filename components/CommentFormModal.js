import {
	Modal,
	Pressable,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import ThemedText from "./ThemedText";
import { useContext, useState } from "react";
import CustomButton from "./CustomButton";
import { Toast } from "toastify-react-native";
import fetchurl from "../scripts/fetchurl";
import styles from "../assets/style";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

const CommentFormModal = ({ paramId = null, object = {}, fetchObjects }) => {
	const [commentModal, setCommentModal] = useState(false);

	const [rawFormData, setRawFormData] = useState({
		title: "",
		text: "",
		name: "",
		email: "",
	});

	const { title, text, name, email } = rawFormData;

	const [btnText, setBtnText] = useState("Submit");

	// Create comment
	const sendComment = async () => {
		const abortController = new AbortController(); // for fetching comments again
		setBtnText("...");
		const res = await fetchurl(`/comments/${paramId}`, "POST", "no-cache", {
			...rawFormData,
			website: "https://demo.com/",
			resourceId: paramId,
			parentId: undefined,
			onModel: "Secret",
			user: undefined,
			status: "published",
		});
		if (res.status === "error") {
			Toast.error(res.message, "bottom");
			setBtnText("Submit");
			setCommentModal(false);
			return;
		}
		Toast.success("Comment created", "bottom");
		resetForm();
		setBtnText("Submit");
		setCommentModal(false);
		await fetchObjects(`?resourceId=${paramId}`, abortController);
	};

	const resetForm = () => {
		setRawFormData({
			title: "",
			text: "",
			name: "",
			email: "",
		});
	};

	// Here goes the traslation
	const { t } = useContext(LanguageContext);

	// Manage theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	return (
		<>
			<Pressable onPress={() => setCommentModal(true)}>
				<ThemedText
					type="default"
					style={[
						styles.btn,
						styles.btnDark,
						{
							marginVertical: 15,
							marginHorizontal: 15,
						},
					]}
				>
					{t("commentform:commentsModalTitle")}
				</ThemedText>
			</Pressable>
			<Modal
				animationType="slide"
				transparent={true}
				visible={commentModal}
				onRequestClose={() => setCommentModal(!commentModal)}
			>
				<TouchableWithoutFeedback
					onPress={() => {
						setCommentModal(false);
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
											marginBottom: 15,
											textAlign: "center",
											color: isDark ? "#FFF" : "#000",
										},
									]}
								>
									{t("commentform:commentsAddingToLabel")} {object.title}
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
									{t("commentform:commentsTitleLabel")}
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
									placeholder="Untitled"
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
									{t("commentform:commentsTextLabel")}
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
									{t("commentform:commentsNameLabel")}
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
									{t("commentform:commentsEmailLabel")}
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
									placeholder="john.doe@demo.com"
									keyboardType="email-address"
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
											onPress={sendComment}
											color="#000"
										/>
									</View>
									<CustomButton
										title="Cancel"
										onPress={() => setCommentModal(false)}
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

export default CommentFormModal;
