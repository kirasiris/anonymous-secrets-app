import { Link, Stack } from "expo-router";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import styles from "../assets/style";

const NotFoundScreen = ({}) => {
	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "404 ERROR!",
					headerTitleAlign: "center",
				}}
			/>
			<ThemedView styleList={[styles.errorpage]}>
				<ThemedText type="title">This screen doest not exist</ThemedText>
				<Link href="/" style={[styles.link]}>
					<ThemedText type="link">Go to home screen!</ThemedText>
				</Link>
			</ThemedView>
		</>
	);
};

export default NotFoundScreen;
