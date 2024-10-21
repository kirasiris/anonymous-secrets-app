import { ActivityIndicator, StyleSheet, View } from 'react-native';

export function Loader() {

  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
