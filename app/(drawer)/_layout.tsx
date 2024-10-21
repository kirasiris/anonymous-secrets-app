import { Drawer } from 'expo-router/drawer';
import 'react-native-reanimated';
import { Image } from 'react-native';
import { Link } from 'expo-router';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import styles from '@/assets/style';

export default function DrawerLayout() {

  const navigation  = useNavigation();

  return (
    <Drawer screenOptions={{
      headerShown: true,
      // title: '',
      headerTitle: () => <Link href="/home"><Image source={require('@/assets/images/favicon.png')} /></Link>,
      headerTitleAlign: "center",
      headerLeft: () => <TabBarIcon name={`menu`} color={`#000`} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={[styles.leftButton]} />,
      headerRight: () => <Link href="/create" style={[styles.rightButton]}>New</Link>,
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