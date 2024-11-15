import {  VirtualizedList, View, ActivityIndicator, PixelRatio, RefreshControl } from 'react-native';
import { Link, Stack, useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { fetchurl } from '@/scripts/fetchurl';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { ThemedText } from '@/components/ThemedText';
import { Loader } from '@/components/Loader';
import styles from '@/assets/style';
import { SearchBar } from '@/components/SearchBar';
import { ThemedView } from '@/components/ThemedView';
import { Single } from '@/components/secrets/Single';

export default function HomeScreen() {

  const searchParams = useGlobalSearchParams();

  const page = searchParams.page || 1;
  const limit = searchParams.limit || 0;
  const sort = searchParams.sort || "-createdAt"
  const sex = searchParams.sex ? `&sex=${searchParams.sex}` : "";
  const age = searchParams.age ? `&age[gte]=${searchParams.age}` : "";
  const secondaryage = searchParams.secondaryage ? `&age[lte]=${searchParams.secondaryage}` : "";
  const nsfw = searchParams.nsfw === "true" ? `&nsfw=${searchParams.nsfw}` : "";
  const estate = searchParams.estate ? `&state=${searchParams.estate}` : "";

  const [secrets, setSecrets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const abortController = new AbortController();

    const fetchSecrets = async (params = '') => {
      try {
        const res = await fetchurl(
          `/extras/secrets${params}`.replace(/&_=\d+/, ''), // url
          'GET', // method
          'default', // cache
          {}, // body
          abortController.signal, // signal
          false, // multipart
          false // is remote
        );
        
        setSecrets(res.data);

      } catch (err) {
        console.error('Error fetching secrets:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSecrets(`?page=${page}&limit=${limit}&sort=${sort}${sex}${age}${secondaryage}${nsfw}${estate}&decrypt=true`);
    
    return () => abortController.abort();
    
  }, [sex, age, secondaryage, nsfw, estate]);

  const getItem = (data: any[], index: number) => data[index];

  const getItemCount = (data: any[]) => data.length;

  if(loading) {
    return  <ActivityIndicator size="large" color="#0000FF" />
  }

  // Get the font scale factor
  const scale = PixelRatio.getFontScale();

  // Define a font size based on scale factor
  const scaledFontSize = 16 * scale; // Default font size of 16sp


  // Refresh secrets
  // const [refreshingSecrets, setRefreshing] = useState(false);

  // const onRefreshing = async (params = '') => {
  //   setRefreshing(true);
  //   try {
  //     const res = await fetchurl(
  //       `/extras/secrets${params}`.replace(/&_=\d+/, ''), // url
  //       'GET', // method
  //       'default', // cache
  //       {}, // body
  //       undefined, // signal
  //       false, // multipart
  //       false // is remote
  //     );

  //     setSecrets(res.data);

  //   } catch (err) {
  //     console.log('Error refreshing secrets:', err);
  //   } finally {
  //     setRefreshing(false);
  //   }
  // }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Home',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: scaledFontSize, // Use scaled font size
          },
          // headerLeft: () => <Text>Example Left</Text>,
          headerRight: () =>  <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={[styles.filterIcon]} /></Link>
        }}
      />
      <SearchBar lightColor="#FFF" darkColor="#FFF" />
      <ThemedView style={{ flex: 1 }}>
      {loading ? <Loader /> : (
        secrets !== undefined && secrets !== null && secrets.length > 0 ? (
          <VirtualizedList
            data={secrets}
            initialNumToRender={50}
            renderItem={({item}) => (
              <Single key={item._id} object={item} />
            )}
            keyExtractor={(item) => item._id.toString()}
            getItemCount={getItemCount}
            getItem={getItem}
            // refreshControl={
            //   <RefreshControl refreshing={refreshingSecrets} onRefresh={onRefreshing} />
            // }
          />
        ) : (
          <View style={styles.card}>
            {/* User info section */}
            <View style={styles.cardInfo}>
              {/* HERE GOES THE SEX */}
              {/* DETAILS */}
              <View style={styles.cardDetails}>
                <View style={styles.cardTitleContainer}>
                  <ThemedText style={[styles.cardTitle]}>ADMIN</ThemedText>
                </View>
              </View>
            </View>
            <ThemedText type="default" style={[styles.cardText]}>NO SECRETS YET</ThemedText>
          </View>
        )
      )}
      </ThemedView>
    </>
  );
}