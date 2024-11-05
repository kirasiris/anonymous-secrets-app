import React from 'react';
import { ScrollView, View} from 'react-native';
import { Link, Stack } from 'expo-router';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import styles from '@/assets/style';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SearchBar } from '@/components/SearchBar';

export default function SearchScreen() {

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Search',
          headerTitleAlign: 'center',
          headerLeft: () => <Link href={`/`} style={[styles.filterIcon, { color: '#FFF' }]}>Home</Link>,
          headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#FFF" darkColor="#FFF" style={[styles.filterIcon]} /></Link>,
          headerStyle: {
            backgroundColor: '#0163D2'
          },
          headerTitleStyle: {
            color: "#FFFFFF",
          },
        }}
      />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView>
          <View style={[styles.container]}>
            <ThemedText type="default" style={[styles.labelText]}>Enter ID and then click Enter</ThemedText>
            <SearchBar lightColor="#FFF" darkColor="#FFF" />
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}