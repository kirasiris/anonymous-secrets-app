import React from 'react';
import { Drawer } from 'expo-router/drawer';
import 'react-native-reanimated';
import { Link } from 'expo-router';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { View } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import styles from '@/assets/style';

export default function DrawerLayout() {

  const navigation  = useNavigation();

  return (
    <Drawer screenOptions={{
      headerShown: true,
      // title: '',
      headerTitle: () => <Link href="/home"><FontAwesomeIcon name='user-secret' size={45} lightColor="#FFF" darkColor="#FFF" /></Link>,
      headerTitleAlign: "center",
      headerLeft: () => <TabBarIcon name={`menu`} color={`#000`} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={[styles.leftButton]} />,
      headerRight: () =>  <View style={styles.headerRightContainer}>
                            <Link href={`/search`}><FontAwesomeIcon name='search' lightColor="#FFF" darkColor="#FFF" /></Link>
                            <Link href="/create" style={[styles.rightButton, styles.btn, styles.btnOutlineLight, {color: '#FFF'}]}>New</Link>
                          </View>,
      headerStyle: {
        backgroundColor: "#0163D2",
      },
      headerTintColor: "#FFFFFF",
    }}>
      <Drawer.Screen name='home' options={{
        drawerLabel: 'Home',
        title: 'Home',
      }} />
      <Drawer.Screen name='filter' options={{
        drawerLabel: 'Filter',
        title: 'Filter',
      }} />
      <Drawer.Screen name='rules' options={{
        drawerLabel: 'Rules',
        title: 'Rules',
      }} />
      <Drawer.Screen name='changelog' options={{
        drawerLabel: 'Changelog',
        title: 'Changelog'
      }} />
      <Drawer.Screen name='contact' options={{
        drawerLabel: 'Contact',
        title: 'Changelog'
      }} />
      <Drawer.Screen name='read' options={{
        headerShown: true,
        drawerItemStyle: { display: 'none' } // This hides the menu item
      }} />
    </Drawer>
  );
}