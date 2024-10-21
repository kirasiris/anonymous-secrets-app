import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ReportModal } from '@/components/ReportModal';
import { ThemedText } from '@/components/ThemedText';
import { calculateTimeSincePublished } from '@/scripts/calculatetimesincepublished';
import { fetchurl } from '@/scripts/fetchurl';
import { Loader } from '@/components/Loader';
import styles from '@/assets/style';

export default function ReadScreen() {

  const [secret, setSecret] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        const res = await fetchurl(
          `/extras/secrets/${params.id}`, // url
          "GET", // method
          'no-cache', // cache
          {}, // body
          undefined, // signal
          false, // multipart
          false // is remote
        );

        setSecret(res.data);

      } catch (err) {
        console.log('Error fetching secret:', err);
      } finally {
        setLoading(false)
      }
    }
    fetchSecret();
  }, [params.id]);

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerTitleAlign: 'left',
          // headerLeft: () => <Text>Example Left</Text>,
          headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' color="#000" style={[styles.filterIcon]} /></Link>
        }}
      />
        {loading ? <Loader /> : (
          secret !== undefined && secret !== null && secret !== '' && 
          <>
            <View style={[styles.postContainer]}>
              <View style={[styles.leftContainer]}>
                {secret.sex === 'male' && <TabBarIcon name='male' color="#2e6889" />}
                {secret.sex === 'female' && <TabBarIcon name='female' color="#a23d63" />}
                {secret.sex === 'non-binary' && <TabBarIcon name='male-female' color="#000000" />}
                <Text style={[styles.age]}>{secret.age}&nbsp;years&nbsp;old</Text>
                <Text>{calculateTimeSincePublished(secret.createdAt)}</Text>
              </View>
              <View style={[styles.rightContainer]}>
                <Link href={{
                  pathname: `/read/${secret._id}`,
                  // params: {}
                }}>
                  <ThemedText type='subtitle' darkColor={true} style={{marginBottom: 5}}>{secret.title}</ThemedText>
                </Link>
                <Text style={[styles.content]}>{secret.text}</Text>
              </View>
            </View>
            <View style={[styles.footer]}>
              <Link href={{
                pathname: `/read/${secret._id}`,
                // params: {}
              }}>
                <Pressable style={[styles.icon]}>
                  <FontAwesomeIcon name='link' size={15} />
                </Pressable>
              </Link>
              <Pressable style={[styles.icon]}>
                <ReportModal resourceId={secret._id} postType="secret" onModel='Secret' />
              </Pressable>
            </View>
          </>
        )}
    </ScrollView>
  )
}