import { View } from "react-native";
import ThemedText from "../ThemedText";
import calculateTimeSincePublished from "../../scripts/calculatetimesincepublished";
import styles from "../../assets/style";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Single = ({ object = {} }) => {
	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	return (
		<View style={[styles.card, { marginBottom: 0, marginHorizontal: 0 }]}>
			{/* User info section */}
			<View style={[styles.cardInfo]}>
				{/* DETAILS */}
				<View style={[styles.cardDetails, { marginLeft: 0 }]}>
					<View style={[styles.cardTitleContainer]}>
						<ThemedText
							type="defaultSemiBold"
							style={{
								color: isDark ? "#FFF" : "#000",
							}}
						>
							{object.title}
						</ThemedText>
					</View>
					<View style={[styles.cardSubtitle]}>
						<ThemedText type="default" style={[styles.cardHandle]}>
							{object.name}&nbsp;about&nbsp;
							{calculateTimeSincePublished(object.createdAt)}
						</ThemedText>
					</View>
				</View>
			</View>
			{/* TEXT */}
			<ThemedText
				type="default"
				style={[
					styles.cardText,
					{
						color: isDark ? "#FFF" : "#000",
					},
				]}
			>
				{object.text}
			</ThemedText>
		</View>
	);
};

export default Single;
