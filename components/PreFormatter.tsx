import { Text, View, StyleSheet } from 'react-native';

export function PreformattedText({ children }){
  return (
    <View style={styles.pre}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pre: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    // whiteSpace: 'pre-wrap',
  },
});