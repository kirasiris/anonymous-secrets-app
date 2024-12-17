import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { createContext, useContext, useState, useEffect } from "react";

// Define the type for the LanguageContext
interface LanguageContextType {
    language: string; // This represents the current language
    setLanguage: (language: string) => Promise<void>; // The function to change the language
}

// Create the context with a default type
const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: async () => {}, // Provide a no-op function as default
});

export const LanguageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [language, setLanguage] = useState("en");

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage =
                (await AsyncStorage.getItem("language")) || "en";
            setLanguage(savedLanguage);
            i18next.changeLanguage(savedLanguage);
        };
        loadLanguage();
    }, []);

    const changeMyLanguage = async (language: string) => {
        setLanguage(language);
        await i18next.changeLanguage(language);
        // Persist language in AsyncStorage
        await AsyncStorage.setItem("language", language);
    };

    return <LanguageContext.Provider value={{language, setLanguage: changeMyLanguage}}>
            {children}
        </LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);