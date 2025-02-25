import { decode } from "html-entities";
import { useContext } from "react";
import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import { ThemeContext } from "../context/ThemeContext";

const ParseHtml = ({ text = "", ...props }) => {
	const { width } = useWindowDimensions();

	const decodedText = decode(text);

	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	const tagsStyles = {
		body: {
			color: isDark ? "#FFF" : "#000",
		},
	};

	return (
		<RenderHTML
			source={{ html: decodedText }}
			contentWidth={width}
			tagsStyles={tagsStyles}
		/>
	);
};

export default ParseHtml;
