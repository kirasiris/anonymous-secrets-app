import { useContext } from "react";
import { Button } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const Toggletheme = ({ ...props }) => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<Button
			title={theme === "light" ? "🌞 Light Mode" : "🌕 Dark Mode"}
			onPress={toggleTheme}
			{...props}
		/>
	);
};

export default Toggletheme;
