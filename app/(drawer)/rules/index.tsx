import { ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Link, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { fetchurl } from '@/scripts/fetchurl';
import { Loader } from '@/components/Loader';
import styles from '@/assets/style';
import { formatDateWithoutTime } from '@/scripts/formatdatewithoutime';
import { ThemedView } from '@/components/ThemedView';

export default function RuleScreen() {

  const [rulesPage, setRulesPage] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetchurl(
          `/pages/${process.env.EXPO_PUBLIC_RULES_PAGE_ID}`, // url
          "GET", // method
          "default", // cache
          {}, // body
          undefined, // signal
          false, // multipart
          false // is remote
        );
        setRulesPage(res.data);
      } catch (err) {
        console.log('Error fetching page:', err)
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
  }, []);

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        title: rulesPage.title,
        headerTitleAlign: 'left',
        // headerLeft: () => <Text>Example Left</Text>,
        headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={[styles.filterIcon]} /></Link>
      }} />
      <ThemedView style={{ height: '100%' }}>
        <ScrollView>
          {loading ? <Loader /> : (
            rulesPage !== undefined && rulesPage !== null && rulesPage !== '' && (
            <View style={[styles.container]}>
              <ThemedText type='title'>IMPORTANT TO READ</ThemedText>
              <ThemedText type='subtitle'>Please make sure to read these!</ThemedText>
              <ThemedText type="default">Published on {formatDateWithoutTime(rulesPage.createdAt)} by {rulesPage.user.username}</ThemedText>
              <ThemedText type="default">{rulesPage.text}</ThemedText>
            </View>
            )
          )}
        </ScrollView>
      </ThemedView>
    </>
  );
}
