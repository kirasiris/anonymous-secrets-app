import { Link, Stack, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { PixelRatio, View, VirtualizedList } from 'react-native'
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { fetchurl } from '@/scripts/fetchurl';
import { Loader } from '@/components/Loader';
import styles from '@/assets/style';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ParseHtml } from '@/components/ParseHtml';

export default function ReadPollScreen() {
  
  const searchParams = useGlobalSearchParams();
  const params = useLocalSearchParams()

  const [pollquestions, setPollQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const abortController = new AbortController();

    const fetchPollQuestions = async (params = '') => {
      try {
        const res = await fetchurl(
          `/questions${params}`, // url
          "GET", // method
          'default', // cache
          {}, // body
          abortController.signal, // signal
          false, // multipart
          false // is remote
        );

        setPollQuestions(res.data);

      } catch (err) {
        console.log('Error fetching questions:', err);
      } finally {
        setLoading(false)
      }
    }
    
    fetchPollQuestions(`?resourceId=${params.id}&onModel=Poll&decrypt=true`);

    return () => abortController.abort();

  }, [loading]);

  const getItem = (data: any[], index: number) => data[index];

  const getItemCount = (data: any[]) => data.length;  

  // Get the font scale factor
  const scale = PixelRatio.getFontScale();

  // Define a font size based on scale factor
  const scaledFontSize = 16 * scale;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Reading...',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: scaledFontSize, // Use scaled font size
          },
          // headerLeft: () => <Text>Example Left</Text>,
          headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={[styles.filterIcon]} /></Link>
        }}
      />
      <ThemedView style={{ flex: 1 }}>
        {loading ? <Loader /> : (
          pollquestions !== undefined && pollquestions !== null && pollquestions.length > 0 ? (
          <VirtualizedList
            data={pollquestions}
            initialNumToRender={50}
            renderItem={({item}) => (
              <View key={item._id} style={[styles.container]}>
                <Link href={`/polls/question/${item._id}`}><ThemedText type="link">{item.title}</ThemedText></Link>
                <ParseHtml text={item.text} />
              </View>
            )}
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
            <ThemedText type="default" style={[styles.cardText]}>NO QUESTIONS YET LOL</ThemedText>
          </View>
        ))}
      </ThemedView>
    </>
  )
}