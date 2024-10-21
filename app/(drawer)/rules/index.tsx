import { ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Link, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { fetchurl } from '@/scripts/fetchurl';
import { Loader } from '@/components/Loader';
import styles from '@/assets/style';
import { formatDateWithoutTime } from '@/scripts/formatdatewithoutime';
import  {ParseHtml} from '@/components/ParseHtml';

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
        // console.log(res.data)
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
      <ScrollView>
        <Stack.Screen options={{
          headerShown: true,
          title: rulesPage.title,
          headerTitleAlign: 'left',
          // headerLeft: () => <Text>Example Left</Text>,
          headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' color="#000" style={[styles.filterIcon]} /></Link>
        }} />
        {loading ? <Loader /> : (
          rulesPage !== undefined && rulesPage !== null && rulesPage !== '' && (
          <View style={[styles.container]}>
            <ThemedText type='title'>IMPORTANT TO READ</ThemedText>
            <ThemedText type='subtitle'>Please make sure to read these!</ThemedText>
            <Text>Published on {formatDateWithoutTime(rulesPage.createdAt)} by {rulesPage.user.username}</Text>
            <ParseHtml text={rulesPage.text} />
          </View>
          )
        )}
      </ScrollView>
  );
}
