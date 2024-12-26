import { View, SectionList, PixelRatio, RefreshControl } from 'react-native';
import { Link, Stack, useGlobalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { fetchurl } from '@/scripts/fetchurl';
import { Loader } from '@/components/Loader';
import styles from '@/assets/style';
import { ThemedView } from '@/components/ThemedView';
import { ParseHtml } from '@/components/ParseHtml';
import { useTranslation } from 'react-i18next';


export default function ChangelogsScreen() {

  const searchParams = useGlobalSearchParams();

  const page = searchParams.page || 1;
  const limit = searchParams.limit || 50;
  const sort = searchParams.sort || "-createdAt";

  const [changelogs, setChangelogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChangelogs = async (params = '', abortController: any) => {
    try {
      const res = await fetchurl(
        `/changelogs${params}`, // url
        'GET', // method
        'default', // cache
        {}, // body
        abortController.signal, // signal
        false, // multipart
        false // is remote
      );

      const groupByDate = res?.data?.reduce((groups: any[], changelog: any) => {
        const date = changelog.createdAt.split("T")[0];
        const existingGroup = groups.find(group => group.title === date);
        if (!existingGroup) {
          groups.push({ title: date, data: [changelog] });
        } else {
          existingGroup.data.push(changelog);
        }
        return groups;
      }, []);

      setChangelogs(groupByDate);

    } catch (err) {
      console.log('Error fetching changelogs', err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const abortController = new AbortController();

    fetchChangelogs(`?page=${page}&limit=${limit}&sort=${sort}&project=anonymous-secrets-app`, abortController);

    return () => abortController.abort();

  }, [searchParams]);

  // Get the font scale factor
  const scale = PixelRatio.getFontScale();

  // Define a font size based on scale factor
  const scaledFontSize = 16 * scale;

  const { t } = useTranslation();

  // Pull down to refresh
  const refreshContent = useCallback(() => {
    const abortController = new AbortController();

    fetchChangelogs(`?page=${page}&limit=${limit}&sort=${sort}&project=anonymous-secrets-app`, abortController);

    return () => abortController.abort();
  }, [])

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        title: t("changelogpage:changelogTitle"),
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: scaledFontSize, // Use scaled font size
        },
        // headerLeft: () => <Text>Example Left</Text>,
        headerRight: () =>  <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={[styles.filterIcon]} /></Link>
      }} />
        <ThemedView style={{ flex: 1 }}>
          <View style={[styles.container]}>
            <ThemedText type='subtitle' style={[styles.mb3]}>{t("changelogpage:changelogDescription")}</ThemedText>
          </View>
          <View style={[styles.container, { flex: 1, marginLeft: 15, marginRight: 0 }]}>
          {
            loading ? (
              <Loader />
            ) : changelogs.length > 0 ? (
                <SectionList
                  sections={changelogs}
                  keyExtractor={(item) => item._id.toString()}
                  renderItem={({ item }) => 
                    <View key={item._id} style={[styles.container]}>
                      <ParseHtml text={item.text} />
                    </View>
                  }
                  renderSectionHeader={({ section: { title } }) => (
                    <ThemedText type="default" style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</ThemedText>
                  )}
                  refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshContent} />}
                />
                ) : (
                  <View>
                    <ThemedText type="default">
                      NO CHANGELOGS YET
                    </ThemedText>
                  </View>
                )
          }
          </View>
        </ThemedView>
    </>
  );
}