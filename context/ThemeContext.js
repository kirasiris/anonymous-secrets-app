import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light");

	// Load the theme from AsyncStorage
	useEffect(() => {
		const loadTheme = async () => {
			const storedTheme = (await AsyncStorage.getItem("theme")) || "light";
			setTheme(storedTheme);
		};

		loadTheme();
	}, []);

	// Function to toggle the theme
	const toggleTheme = async () => {
		const newTheme = theme === "light" ? "dark" : "light";
		await AsyncStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
