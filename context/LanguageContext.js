import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";

// Import English translations
import enChangelogs from "../locales/en/changelogs.json";
import enCommentsForm from "../locales/en/commentsmodal.json";
import enContact from "../locales/en/contact.json";
import enCreate from "../locales/en/create.json";
import enCSS from "../locales/en/css.json";
import enDrawerMenu from "../locales/en/drawermenu.json";
import enFilter from "../locales/en/filter.json";
import enHome from "../locales/en/home.json";
import enMain from "../locales/en/main.json";
import enPolls from "../locales/en/polls.json";
import enReportModal from "../locales/en/reportmodal.json";
import enRules from "../locales/en/rules.json";
import enSearch from "../locales/en/search.json";
import enSettings from "../locales/en/settings.json";

// Import Spanish translations
import esChangelogs from "../locales/es/changelogs.json";
import esCommentsForm from "../locales/es/commentsmodal.json";
import esContact from "../locales/es/contact.json";
import esCreate from "../locales/es/create.json";
import esCSS from "../locales/es/css.json";
import esDrawerMenu from "../locales/es/drawermenu.json";
import esFilter from "../locales/es/filter.json";
import esHome from "../locales/es/home.json";
import esMain from "../locales/es/main.json";
import esPolls from "../locales/es/polls.json";
import esReportModal from "../locales/es/reportmodal.json";
import esRules from "../locales/es/rules.json";
import esSearch from "../locales/es/search.json";
import esSettings from "../locales/es/settings.json";

// Configure i18next
i18n.use(initReactI18next).init({
	compatibilityJSON: "v3",
	resources: {
		en: {
			changelogs: enChangelogs,
			commentform: enCommentsForm,
			contact: enContact,
			create: enCreate,
			css: enCSS,
			drawer: enDrawerMenu,
			filter: enFilter,
			home: enHome,
			main: enMain,
			polls: enPolls,
			report: enReportModal,
			rules: enRules,
			search: enSearch,
			settings: enSettings,
		},
		es: {
			changelogs: esChangelogs,
			commentform: esCommentsForm,
			contact: esContact,
			create: esCreate,
			css: esCSS,
			drawer: esDrawerMenu,
			filter: esFilter,
			home: esHome,
			main: esMain,
			polls: esPolls,
			report: esReportModal,
			rules: esRules,
			search: esSearch,
			settings: esSettings,
		},
	},
	ns: [
		"commentform",
		"contact",
		"create",
		"css",
		"drawer",
		"filter",
		"home",
		"main",
		"polls",
		"report",
		"rules",
		"search",
		"settings",
	],
	lng: Localization.getLocales()[0].languageCode || "en", // Default device language
	fallbackLng: "en", // Fallback in case language is not available
	interpolation: {
		escapeValue: false, // React already escapes values
	},
});

/**
 *
 * CONTEXT
 *
 */

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
	// Init language internationalization
	const { t, i18n } = useTranslation();

	// Set default language
	const [language, setLanguage] = useState("en");

	// Load language from AsyncStorage
	useEffect(() => {
		const loadLanguage = async () => {
			const storedLanguage = (await AsyncStorage.getItem("language")) || "en";
			setLanguage(storedLanguage);
			await i18n.changeLanguage(storedLanguage);
		};
		loadLanguage();
	}, []);

	// Function to switch language
	const switchLanguage = async () => {
		const newLanguage = language === "en" ? "es" : "en";
		await AsyncStorage.setItem("language", newLanguage);
		setLanguage(newLanguage);
		await i18n.changeLanguage(newLanguage);
	};

	return (
		<LanguageContext.Provider value={{ language, switchLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
};

export default LanguageProvider;
