import { View, TouchableOpacity, Share } from "react-native";
import { Link } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { Toast } from "toastify-react-native";
import ThemedText from "../ThemedText";
import { faMars } from "@fortawesome/free-solid-svg-icons/faMars";
import { faVenus } from "@fortawesome/free-solid-svg-icons/faVenus";
import { faMarsAndVenus } from "@fortawesome/free-solid-svg-icons/faMarsAndVenus";
import calculateTimeSincePublished from "../../scripts/calculatetimesincepublished";
import Flag from "../Flag";
import ReportModal from "../ReportModal";
import styles from "../../assets/style";
import CustomIcon from "../CustomIcon";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";

const Single = ({ object = {}, isSingle = true }) => {
	const shareSecret = async () => {
		try {
			const res = await Share.share({
				message: `${process.env.EXPO_PUBLIC_OWNER_URL}/secret/${object._id}`,
			});
			if (res.action === Share.sharedAction) {
				if (res.activityType) {
					// shared with activity type of res.activityType
				} else {
					// shared
				}
			} else if (res.action === Share.dismissedAction) {
				// dimissed
			}
		} catch (err) {
			Toast.error(err.message, "bottom");
		}
	};

	const copyId = async () => {
		await Clipboard.setStringAsync(object._id);
	};

	const copyText = async () => {
		await Clipboard.setStringAsync(object.text);
	};

	// Here goes the translation
	const { t } = useContext(LanguageContext);

	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	return (
		<View
			style={[
				styles.card,
				{
					backgroundColor: isDark ? "#16181b" : "#FFF",
				},
			]}
		>
			{/* User info section */}
			<View style={[styles.cardInfo]}>
				{/* SEX */}
				{object.sex === "male" && (
					<CustomIcon icon={faMars} size={25} style={{ color: "#2E6889" }} />
				)}
				{object.sex === "female" && (
					<CustomIcon icon={faVenus} size={25} style={{ color: "#A23D63" }} />
				)}
				{object.sex === "non-binary" && (
					<CustomIcon
						icon={faMarsAndVenus}
						size={25}
						style={{ color: "#000000" }}
					/>
				)}
				{/* DETAILS */}
				<View style={[styles.cardDetails]}>
					<Link
						href={{
							pathname: `/home/read/${object._id}`,
							// params: {}
						}}
					>
						<View style={[styles.cardTitleContainer]}>
							<ThemedText
								style={[
									styles.cardTitle,
									{
										color: isDark ? "#FFF" : "#000",
									},
								]}
							>
								{object.title}
							</ThemedText>
						</View>
					</Link>
					<View style={[styles.cardSubtitle]}>
						<ThemedText type="default" style={[styles.cardHandle]}>
							{object.age}&nbsp;years&nbsp;old&nbsp;
						</ThemedText>
						<ThemedText type="default" style={[styles.cardHandle]}>
							&nbsp;about&nbsp;{calculateTimeSincePublished(object.createdAt)}
							&nbsp;from&nbsp;{object.state}
						</ThemedText>
					</View>
					<View style={[styles.cardSubtitle]}>
						<Flag flag={object.state} style={[{ marginRight: 5 }]} />
						<ThemedText
							type="default"
							style={[styles.cardHandle]}
							onPress={copyId}
						>
							{t("main:copyObjectIdLabel")}
						</ThemedText>
					</View>
				</View>
			</View>
			{/* TEXT */}
			{/* Display it on index page if NSFW */}
			{object.nsfw && !isSingle && (
				<ThemedText
					type="default"
					style={[
						styles.cardText,
						styles.nsfwCardText,
						{
							color: isDark ? "#FFF" : "#000",
						},
					]}
				>
					{t("main:thisIsNSFWLabel")}
				</ThemedText>
			)}
			{/* Full NSFW content on single page */}
			{object.nsfw && isSingle && (
				<ThemedText
					type="default"
					style={[
						styles.cardText,
						{
							color: isDark ? "#FFF" : "#000",
						},
					]}
					onLongPress={copyText}
				>
					{object.text}
				</ThemedText>
			)}
			{/* Password-protected message on index page */}
			{object.password && !isSingle && (
				<ThemedText
					type="default"
					style={[
						styles.cardText,
						{
							color: isDark ? "#FFF" : "#000",
						},
					]}
				>
					{t("main:passwordRequiredLabel")}
				</ThemedText>
			)}
			{/* Display text if SFW and not password-protected */}
			{!object.nsfw && !object.password && !isSingle && (
				<ThemedText
					type="default"
					style={[
						styles.cardText,
						{
							color: isDark ? "#FFF" : "#000",
						},
					]}
					onLongPress={copyText}
				>
					{object.text}
				</ThemedText>
			)}
			{/* Display text if SFW and not password-protected */}
			{!object.nsfw && !object.password && isSingle && (
				<ThemedText
					type="default"
					style={[
						styles.cardText,
						{
							color: isDark ? "#FFF" : "#000",
						},
					]}
					onLongPress={copyText}
				>
					{object.text}
				</ThemedText>
			)}
			<View style={styles.cardFooter}>
				{!isSingle && (
					<Link
						href={{
							pathname: `/home/read/${object._id}`,
							// params: {}
						}}
						style={[styles.cardIcon]}
					>
						<ThemedText
							type="default"
							style={[
								{
									fontSize: 14,
									color: "#1DA1F2",
								},
							]}
						>
							{t("main:readSecretLink")}
						</ThemedText>
					</Link>
				)}
				<TouchableOpacity style={[styles.cardIcon]} onPress={shareSecret}>
					<ThemedText
						type="default"
						style={[
							{
								fontSize: 14,
								color: "#1DA1F2",
							},
						]}
					>
						{t("main:shareSecretLink")}
					</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.cardIcon]} onPress={copyText}>
					<ThemedText
						type="default"
						style={[
							{
								fontSize: 14,
								color: "#1DA1F2",
							},
						]}
					>
						{t("main:copySecretLink")}
					</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.cardIcon]}>
					<ReportModal
						object={object}
						postType="secret"
						onModel="Secret"
						lightColor="#FFF"
						darkColor="#FFF"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Single;
