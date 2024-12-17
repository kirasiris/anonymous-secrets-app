import React from 'react';
import { PixelRatio, ScrollView, View} from 'react-native';
import { Link, Stack } from 'expo-router';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import styles from '@/assets/style';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SearchBar } from '@/components/SearchBar';
import { useTranslation } from 'react-i18next';


export default function SearchScreen() {

  // Get the font scale factor
  const scale = PixelRatio.getFontScale();

  // Define a font size based on scale factor
  const scaledFontSize = 16 * scale;

  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('searchpage:searchTitle'),
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: scaledFontSize
          },
          headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#FFF" darkColor="#FFF" style={[styles.filterIcon]} /></Link>,
        }}
      />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView>
          <View style={[styles.container]}>
            <ThemedText type="default" style={[styles.labelText]}>{t('searchpage:searchLabel')}</ThemedText>
            <SearchBar lightColor="#FFF" darkColor="#FFF" />
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}