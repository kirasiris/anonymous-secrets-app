import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

export function Loader() {

  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" />
      <ThemedText type="default">Waking up server...</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});
