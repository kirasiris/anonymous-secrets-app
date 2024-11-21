import { View, PixelRatio, VirtualizedList } from 'react-native';
import { Link, Stack, useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { fetchurl } from '@/scripts/fetchurl';
import { Loader } from '@/components/Loader';
import styles from '@/assets/style';
import { ThemedView } from '@/components/ThemedView';
import { ParseHtml } from '@/components/ParseHtml';


export default function PollsScreen() {

  const searchParams = useGlobalSearchParams();

  const page = searchParams.page || 1;
  const limit = searchParams.limit || 50;
  const sort = searchParams.sort || "-createdAt";

  const [polls, setPolls] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const abortController = new AbortController();

    const fetchPolls = async (params = '') => {
      try {
        const res = await fetchurl(
          `/polls${params}`, // url
          'GET', // method
          'default', // cache
          {}, // body
          abortController.signal, // signal
          false, // multipart
          false // is remote
        );

        setPolls(res.data);

      } catch (err) {
        console.log('Error fetching polls', err)
      } finally {
        setLoading(false);
      }
    };

    fetchPolls(`?page=${page}&limit=${limit}&sort=${sort}&decrypt=true`);

    return () => abortController.abort();

  }, [searchParams]);

  const getItem = (data: any[], index: number) => data[index];

  const getItemCount = (data: any[]) => data.length;

  // Get the font scale factor
  const scale = PixelRatio.getFontScale();

  // Define a font size based on scale factor
  const scaledFontSize = 16 * scale;

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        title: 'Polls',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: scaledFontSize, // Use scaled font size
        },
        // headerLeft: () => <Text>Example Left</Text>,
        headerRight: () =>  <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={[styles.filterIcon]} /></Link>
      }} />
        <ThemedView style={{ flex: 1 }}>
          {loading ? <Loader /> : (
            polls !== undefined && polls !== null && polls.length > 0 ? (
              <VirtualizedList
                data={polls}
                initialNumToRender={50}
                renderItem={({ item }) => 
                  <View key={item._id} style={[styles.container]}>
                    <Link href={`/polls/read/${item._id}`}><ThemedText type="link">{item.title}</ThemedText></Link>
                    <ParseHtml text={item.text} />
                  </View>
                }
                keyExtractor={(item) => item._id.toString()}
                getItemCount={getItemCount}
                getItem={getItem}
              />
            ) : (
              <View style={[styles.card]}>
                {/* User info section */}
                <View style={[styles.cardInfo]}>
                  {/* HERE GOES THE SEX */}
                  {/* DETAILS */}
                  <View style={[styles.cardDetails]}>
                    <View style={[styles.cardTitleContainer]}>
                      <ThemedText type="defaultSemiBold" style={[styles.cardTitle]}>ADMIN</ThemedText>
                    </View>
                  </View>
                </View>
                <ThemedText type="default" style={[styles.cardText]}>NO QUESTIONS YET</ThemedText>
              </View>
            ))}
        </ThemedView>
    </>
  );
}