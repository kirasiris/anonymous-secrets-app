import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { PixelRatio, ScrollView } from 'react-native'
import { Toast } from 'toastify-react-native';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { fetchurl } from '@/scripts/fetchurl';
import { Loader } from '@/components/Loader';
import { VerifyPassword } from '@/components/VerifyPassword';
import styles from '@/assets/style';
import { ThemedView } from '@/components/ThemedView';
import { Single } from '@/components/secrets/Single';

export default function ReadScreen() {
  const router = useRouter();

  const [secret, setSecret] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const params = useLocalSearchParams();

  useEffect(() => {

    const abortController = new AbortController();

    const fetchSecret = async () => {
      try {
        const res = await fetchurl(
          `/extras/secrets/${params.id}`, // url
          "GET", // method
          'no-cache', // cache
          {}, // body
          abortController.signal, // signal
          false, // multipart
          false // is remote
        );

        // If error loading secret, or secret is not found, redirect back to homepage!
        if(res.status === 'error') {
          Toast.error(res.message, 'bottom');
          router.navigate('/');
          return;
        }

        setSecret(res.data);

      } catch (err) {
        console.log('Error fetching secret:', err);
      } finally {
        setLoading(false)
      }
    }
    
    fetchSecret();

    return () => abortController.abort();

  }, [params.id]);

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
        <ScrollView>
            {loading ? <Loader /> : (
              secret !== undefined && secret !== null && secret !== '' && 
              secret.password !== undefined && secret.password !== null && secret.password !== '' ? <VerifyPassword objectId={params.id} password={secret.password} setObject={setSecret} /> : <Single object={secret} isSingle={false} />
            )}
        </ScrollView>
      </ThemedView>
    </>
  )
}