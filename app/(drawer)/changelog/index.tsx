import { View, SectionList } from 'react-native';
import { Link, Stack, useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { fetchurl } from '@/scripts/fetchurl';
import { Loader } from '@/components/Loader';
import styles from '@/assets/style';
import { ThemedView } from '@/components/ThemedView';
import { ParseHtml } from '@/components/ParseHtml';


export default function ChangelogScreen() {

  const searchParams = useGlobalSearchParams();

  const page = searchParams.page || 1;
  const limit = searchParams.limit || 50;
  const sort = searchParams.sort || "-createdAt";

  const [changelogs, setChangelogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChangelogs = async (params = '') => {
      try {
        const res = await fetchurl(
          `/changelogs${params}`, // url
          'GET', // method
          'default', // cache
          {}, // body
          undefined, // signal
          false, // multipart
          false // is remote
        );

        const groupByDate = res?.data.reduce((groups: any[], changelog: any) => {
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
    fetchChangelogs(`?page=${page}&limit=${limit}&sort=${sort}&project=anonymous-secrets-app`);
  }, [searchParams]);

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        title: 'Changelog',
        headerTitleAlign: 'left',
        // headerLeft: () => <Text>Example Left</Text>,
        headerRight: () =>  <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={[styles.filterIcon]} /></Link>
      }} />
        <ThemedView style={{ height: '100%' }}>
          <View style={[styles.container]}>
          {
            loading ? (
              <Loader />
            ) : changelogs.length > 0 ? (
              <>
                <ThemedText type='subtitle' style={[styles.mb3]}>These are the changes the backend of the application receives</ThemedText>
                <SectionList
                  sections={changelogs}
                  keyExtractor={(item) => item._id.toString()}
                  renderItem={({ item }) => 
                    <View style={[styles.container]}>
                      <ParseHtml text={item.text} />
                    </View>
                  }
                  renderSectionHeader={({ section: { title } }) => (
                    <ThemedText type="default" style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</ThemedText>
                  )}
                />
              </>
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