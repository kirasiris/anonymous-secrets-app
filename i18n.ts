import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

// Map all your resources
const resources = {
	en: {
		changelogpage: () => import("./locales/en/changelogpage.json"),
		common: () => import("./locales/en/common.json"),
		contactpage: () => import("./locales/en/contactpage.json"),
		createpage: () => import("./locales/en/createpage.json"),
		csspage: () => import("./locales/en/csspage.json"),
		drawermenu: () => import("./locales/en/draweroption.json"),
		filterpage: () => import("./locales/en/filterpage.json"),
		homepage: () => import("./locales/en/homepage.json"),
		pollpage: () => import("./locales/en/pollpage.json"),
		rulepage: () => import("./locales/en/rulepage.json"),
		searchpage: () => import("./locales/en/searchpage.json"),
		settingspage: () => import("./locales/en/settingpage.json"),
		singlepage: () => import("./locales/en/singlepage.json"),
	},
	es: {
		changelogpage: () => import("./locales/es/changelogpage.json"),
		common: () => import("./locales/es/common.json"),
		contactpage: () => import("./locales/es/contactpage.json"),
		createpage: () => import("./locales/es/createpage.json"),
		csspage: () => import("./locales/es/csspage.json"),
		drawermenu: () => import("./locales/es/draweroption.json"),
		filterpage: () => import("./locales/es/filterpage.json"),
		homepage: () => import("./locales/es/homepage.json"),
		pollpage: () => import("./locales/es/pollpage.json"),
		rulepage: () => import("./locales/es/rulepage.json"),
		searchpage: () => import("./locales/es/searchpage.json"),
		settingspage: () => import("./locales/es/settingpage.json"),
		singlepage: () => import("./locales/es/singlepage.json"),
	}
  };

i18next
  .use(resourcesToBackend((language: string, namespace: string) => {
	const langResources = resources[language as keyof typeof resources];
	if(!langResources || !langResources[namespace as keyof typeof langResources]) {
		throw new Error(`Resource for ${language}/${namespace} not found.`);
	}
	return langResources[namespace as keyof typeof langResources]();
	// import(`./locales/${language}/${namespace}.json`);
  }))
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    // compatibilityJSON: "v3", // compatibility isssue for mobile
    debug: true,
    ns: ["changelogpage", "common", "contactpage", "createpage", "csspage", "drawermenu", "filterpage", "homepage", "pollpage", "rulepage", "searchpage", "settingspage", "singlepage"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    }
  });

export default i18next;