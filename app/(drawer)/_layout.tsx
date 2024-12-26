import React from 'react';
import { Drawer } from 'expo-router/drawer';
import 'react-native-reanimated';
import { Link } from 'expo-router';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import styles from '@/assets/style';
import CustomDrawerContent from '@/components/navigation/CustomDrawerContent';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';

export default function DrawerLayout() {

  const { t } = useTranslation();

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
                              <Link href="/create" style={[styles.rightButton, styles.btn, styles.btnOutlineLight, {color: '#FFF'}]}>{t('common:buttonNew')}</Link>
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
          drawerLabel: t('drawermenu:homeItem'),
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name='filter'
        options={{
          drawerLabel: t('drawermenu:filterItem'),
          title: 'Filter',
        }}
      />
      <Drawer.Screen
        name='rules'
        options={{
          drawerLabel: t('drawermenu:rulesItem'),
          title: 'Rules',
        }}
      />
      <Drawer.Screen
        name='css'
        options={{
          drawerLabel: t('drawermenu:cssItem'),
          title: 'Child Safety Standards',
        }}
      />
      <Drawer.Screen
        name='polls'
        options={{
          drawerLabel: t('drawermenu:pollsItem'),
          title: 'Polls'
        }}
      />
      <Drawer.Screen
        name='changelogs'
        options={{
          drawerLabel: t('drawermenu:changelogItem'),
          title: 'Changelog'
        }}
      />
      <Drawer.Screen
        name='contact'
        options={{
          drawerLabel: t('drawermenu:contactItem'),
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
        name='settings'
        options={{
          drawerLabel: t('drawermenu:settingsItem'),
          title: 'Settings',
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