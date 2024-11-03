import {  VirtualizedList, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Link, Stack, useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { fetchurl } from '@/scripts/fetchurl';
import { calculateTimeSincePublished } from '@/scripts/calculatetimesincepublished';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ReportModal } from '@/components/ReportModal';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { ThemedText } from '@/components/ThemedText';
import { Loader } from '@/components/Loader';
import { Flag } from '@/components/Flag';
import styles from '@/assets/style';
import { SearchBar } from '@/components/SearchBar';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

  const searchParams = useGlobalSearchParams();

  const page = searchParams.page || 1;
  const limit = searchParams.limit || 100;
  const sort = searchParams.sort || "-createdAt"
  const sex = searchParams.sex ? `&sex=${searchParams.sex}` : "";
  const age = searchParams.age ? `&age[gte]=${searchParams.age}` : "";
  const secondaryage = searchParams.secondaryage ? `&age[lte]=${searchParams.secondaryage}` : "";
  const nsfw = searchParams.nsfw === "true" ? `&nsfw=${searchParams.nsfw}` : "";
  const estate = searchParams.estate ? `&state=${searchParams.estate}` : "";

  const [secrets, setSecrets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSecrets = async (params = '') => {
      try {
        const res = await fetchurl(
          `/extras/secrets${params}`.replace(/&_=\d+/, ''), // url
          'GET', // method
          'default', // cache
          {}, // body
          undefined, // signal
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
    
  }, [sex, age, secondaryage, nsfw, estate]);

  const getItem = (data: any[], index: number) => data[index];

  const getItemCount = (data: any[]) => data.length;

  if(loading) {
    return  <ActivityIndicator size="large" color="#0000FF" />
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Home',
          headerTitleAlign: 'left',
          // headerLeft: () => <Text>Example Left</Text>,
          headerRight: () =>  <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={[styles.filterIcon]} /></Link>
        }}
      />
      <SearchBar lightColor="#FFF" darkColor="#FFF" />
      <ThemedView style={{ height: '100%' }}>
      {loading ? <Loader /> : (
        secrets !== undefined && secrets !== null && secrets.length > 0 ? (
          <VirtualizedList
            data={secrets}
            initialNumToRender={50}
            renderItem={({item}) => (
              <>
                <View style={[styles.postContainer]}>
                  <View style={[styles.leftContainer]}>
                    {item.sex === 'male' && <TabBarIcon name='male' color="#2e6889" />}
                    {item.sex === 'female' && <TabBarIcon name='female' color="#a23d63" />}
                    {item.sex === 'non-binary' && <TabBarIcon name='male-female' color="#000000" />}
                    <ThemedText type="default" style={[styles.age]}>{item.age}&nbsp;years&nbsp;old</ThemedText>
                    <ThemedText type="default">{calculateTimeSincePublished(item.createdAt)}</ThemedText>
                    <Flag flag={item.state} />
                  </View>
                  <View style={[styles.rightContainer]}>
                    <Link href={{
                      pathname: `/read/${item._id}`,
                      // params: {}
                    }}>
                      <ThemedText type='subtitle' style={{marginBottom: 5}}>{item.title}</ThemedText>
                    </Link>
                    <ThemedText type="default">ID: {item._id}</ThemedText>
                    {item.nsfw ?
                    <ThemedText type="default" style={[styles.nsfwcontent]}>THIS ENTRY IS NSFW. READ IT AT YOUR OWN RISK...</ThemedText> :
                    <ThemedText type="default" style={[styles.content]}>{item.text}</ThemedText>
                    }
                  </View>
                </View>
                <View style={[styles.footer]}>
                  <Link href={{
                    pathname: `/read/${item._id}`,
                    // params: {}
                  }}>
                    <TouchableOpacity style={[styles.icon]}>
                      <FontAwesomeIcon name='link' size={15} />
                    </TouchableOpacity>
                  </Link>
                  <TouchableOpacity style={[styles.icon]}>
                    <ReportModal resourceId={item._id} postType="secret" onModel='Secret' />
                  </TouchableOpacity>
                </View>
              </>
            )}
            keyExtractor={(item) => item._id.toString()}
            getItemCount={getItemCount}
            getItem={getItem}
          />
        ) : (
          <View style={[styles.postContainer]}>
            <View style={[styles.leftContainer]}>
              <TabBarIcon name='male' color="#2e6889" />
              <ThemedText type="default" style={[styles.age]}>ADMIN</ThemedText>
            </View>
            <View style={[styles.rightContainer]}>
              <ThemedText type="default" style={[styles.content]}>NO SECRETS YET</ThemedText>
            </View>
          </View>
        )
      )}
      </ThemedView>
    </>
  );
}