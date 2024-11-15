import { View, Pressable } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedText } from '../ThemedText';

export default function CustomDrawerContent(props:any) {

    const { bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
        {/* This is supposed to be a wrapper for the drawer items */}
        <DrawerContentScrollView {...props}>
            {/* Here goes a logo ideally */}
            {/* <View style={[{ padding: 20 }]}>
                <ThemedText type="default">Hola</ThemedText>
            </View> */}
            {/* This is supposed to fetch the rest of the navigation */}
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        {/* Custom links/code/crap */}
        {/* <Pressable
            style={[{
                paddingHorizontal: 10
            }]}
        >
            <ThemedText type="link">Terms of Service</ThemedText>
        </Pressable>
        <Pressable
            style={[{
                paddingHorizontal: 10,
                paddingBottom: bottom + 10
            }]}
        >
            <ThemedText type="link">Privacy Policy</ThemedText>
        </Pressable> */}
    </View>
  )
};