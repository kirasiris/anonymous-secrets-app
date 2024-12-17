import { PixelRatio, ScrollView, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-native-input-select';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import styles from '@/assets/style';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import i18next, { changeLanguage } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';


export default function SettingsScreen() {
  const backgroundColor = useThemeColor({ light: "#FFF", dark: "#FFF" }, 'background');

  const [rawFormData, setRawFormData] = useState({
      language: i18next.language,
  });

  const { language } = rawFormData;

  // Get the font scale factor
  const scale = PixelRatio.getFontScale();

  // Define a font size based on scale factor
  const scaledFontSize = 16 * scale;

  const changeMyLanguage = async (language: string) => {
    setRawFormData({
        ...rawFormData,
        language: language
    });
    await i18next.changeLanguage(language);
    // Persis language in AsyncStorage
    await AsyncStorage.setItem("language", language);
  }

  useEffect(() => {
    const loadLanguage = async () => {
        const savedLanguage = (await AsyncStorage.getItem("language")) || "en";
        setRawFormData({
            ...rawFormData,
            language: savedLanguage
        });
        i18next.changeLanguage(savedLanguage);
    }
    loadLanguage();
  }, []);

  const { t } = useTranslation();


  return (
    <>
      <Stack.Screen options={{
          headerShown: true,
          title: t('settingspage:settingTitle'),
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: scaledFontSize, // Use scaled font size
          },
          // headerLeft: () => <Text>Example Left</Text>,
          headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={styles.filterIcon} /></Link>
      }} />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView>
          <View style={[styles.container]}>
            <ThemedText type="default" style={[styles.labelText]}>{t('settingspage:changeLanguageLabel')}</ThemedText>
            <Dropdown
                label={undefined}
                placeholder='Select a language'
                options={[
                    { label: 'English', value: 'en' },
                    { label: 'Spanish', value: 'es' },
                ]}
                selectedValue={language}
                onValueChange={(e: any) => {
                    setRawFormData({
                        ...rawFormData,
                        language: e
                    });
                    changeMyLanguage(e);
                }}
                dropdownStyle={{
                    borderRadius: 0
                }}
            />
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}
