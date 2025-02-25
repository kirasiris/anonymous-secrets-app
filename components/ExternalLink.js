import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { Platform } from "react-native";

const ExternalLink = ({ href = "", ...rest }) => {
	return (
		<Link
			target="_blank"
			{...rest}
			href={href}
			onPress={async (e) => {
				if (Platform.OS !== "web") {
					// Prevent the default behavior of linking to the default browser on native
					e.preventDefault();
					// Open the link in an in-app browser
					await openBrowserAsync();
				}
			}}
		/>
	);
};

export default ExternalLink;
