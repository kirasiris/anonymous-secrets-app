import React from 'react';
import { Drawer } from 'expo-router/drawer';
import 'react-native-reanimated';
import { Link } from 'expo-router';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import styles from '@/assets/style';
import CustomDrawerContent from '@/components/navigation/CustomDrawerContent';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function DrawerLayout() {

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        // title: '',
        headerTitle: () => <Link href="/home"><FontAwesomeIcon name='user-secret' size={45} lightColor="#FFF" darkColor="#FFF" /></Link>,
        headerTitleAlign: "center",
        headerLeft: () => <DrawerToggleButton tintColor="#FFF" />,
        headerRight: () =>  <View style={styles.headerRightContainer}>
                              <Link href="/search"><FontAwesomeIcon name='search' lightColor="#FFF" darkColor="#FFF" /></Link>
                              <Link href="/create" style={[styles.rightButton, styles.btn, styles.btnOutlineLight, {color: '#FFF'}]}>New</Link>
                            </View>,
        headerStyle: {
          backgroundColor: "#0163D2",
        },
        headerTintColor: "#FFFFFF",
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name='home'
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name='filter'
        options={{
          drawerLabel: 'Filter',
          title: 'Filter',
        }}
      />
      <Drawer.Screen
        name='rules'
        options={{
          drawerLabel: 'Rules',
          title: 'Rules',
        }}
      />
      <Drawer.Screen
        name='polls'
        options={{
          drawerLabel: 'Polls',
          title: 'Polls'
        }}
      />
      <Drawer.Screen
        name='changelogs'
        options={{
          drawerLabel: 'Changelog',
          title: 'Changelog'
        }}
      />
      <Drawer.Screen
        name='contact'
        options={{
          drawerLabel: 'Contact',
          title: 'Contact'
        }}
      />
      <Drawer.Screen
        name='search'
        options={{
          drawerLabel: 'Search',
          title: 'Search',
          drawerItemStyle: { display: 'none' }
        }}
      />
      <Drawer.Screen
        name='create'
        options={{
          drawerLabel: 'Create',
          title: 'Create',
          drawerItemStyle: { display: 'none' }
        }}
      />
    </Drawer>
  );
}