import { Link, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from '@/assets/style';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        title: '404 ERROR!',
        headerTitleAlign: 'center'
      }} />
      <ThemedView style={[styles.errorpage]}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={[styles.link]}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}