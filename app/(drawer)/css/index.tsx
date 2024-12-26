import { PixelRatio, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { fetchurl } from '@/scripts/fetchurl';
import { Loader } from '@/components/Loader';
import styles from '@/assets/style';
import { formatDateWithoutTime } from '@/scripts/formatdatewithoutime';
// import {formatDateWithoutTime} from 'befree-utilities'
import { ThemedView } from '@/components/ThemedView';
import { ParseHtml } from '@/components/ParseHtml';
import { useTranslation } from 'react-i18next';

export default function ChildSafetyStandardScreen() {

  const [cssPage, setCSSPage] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const abortController = new AbortController();

    const fetchPage = async () => {
      try {
        const res = await fetchurl(
          `/pages/${process.env.EXPO_PUBLIC_CHILD_SAFETY_STANDARDS_PAGE_ID}`, // url
          "GET", // method
          "no-cache", // cache
          {}, // body
          abortController.signal, // signal
          false, // multipart
          false // is remote
        );
        setCSSPage(res.data);
      } catch (err) {
        console.log('Error fetching page:', err)
      } finally {
        setLoading(false);
      }
    }

    fetchPage();

    return () => abortController.abort();

  }, []);

  // Get the font scale factor
  const scale = PixelRatio.getFontScale();

  // Define a font size based on scale factor
  const scaledFontSize = 16 * scale;

  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        title: t("csspage:cssTitle"),
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: scaledFontSize, // Use scaled font size
        },
        // headerLeft: () => <Text>Example Left</Text>,
        headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={[styles.filterIcon]} /></Link>
      }} />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView>
          {loading ? <Loader /> : (
            cssPage !== undefined && cssPage !== null && cssPage !== '' && (
            <View style={[styles.container]}>
                <ThemedText type='title'>{t("csspage:cssDescription")}</ThemedText>
                <ThemedText type='subtitle'>{t("csspage:cssSubtitle")}</ThemedText>
                <ThemedText type="default">Published on {formatDateWithoutTime(cssPage.createdAt)} by {cssPage.user.username}</ThemedText>
                <ParseHtml text={cssPage.text} />
            </View>
            )
          )}
        </ScrollView>
      </ThemedView>
    </>
  );
}
