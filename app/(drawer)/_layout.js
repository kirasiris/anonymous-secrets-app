import { useContext } from "react";
import { Drawer } from "expo-router/drawer";
import { Link } from "expo-router";
import { View } from "react-native";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons/faUserSecret";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import styles from "../../assets/style";
import CustomDrawerContent from "../../components/navigation/CustomDrawerContent";
import CustomIcon from "../../components/CustomIcon";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";

const DrawerLayout = ({}) => {
	// Manage app's theme
	const { theme } = useContext(ThemeContext);

	const isDark = theme === "dark";

	// Here goes the translation
	const { t } = useContext(LanguageContext);

	return (
		<Drawer
			screenOptions={{
				headerShown: true,
				// title: '',
				headerTitle: () => (
					<Link href="/home">
						<CustomIcon
							icon={faUserSecret}
							size={35}
							style={[styles.headerIcons]}
						/>
					</Link>
				),
				headerTitleAlign: "center",
				// headerLeft: () => <DrawerToggleButton tintColor="#FFFFFF" />,
				headerRight: () => (
					<View style={[styles.headerRightContainer]}>
						<Link href="/search">
							<CustomIcon
								icon={faMagnifyingGlass}
								size={25}
								style={[styles.headerIcons]}
							/>
						</Link>
						<Link
							href="/create"
							style={[
								styles.rightButton,
								styles.btn,
								styles.btnOutlineLight,
								{ color: "#FFFFFF" },
							]}
						>
							{t("main:newSecretBtn")}
						</Link>
					</View>
				),
				headerStyle: {
					backgroundColor: "#0163D2",
				},
				headerTintColor: "#FFFFFF",
			}}
			drawerContent={CustomDrawerContent}
		>
			<Drawer.Screen
				name="home"
				options={{
					drawerLabel: t("drawer:homeLabel"),
					title: t("drawer:homeLabel"),
					drawerLabelStyle: {
						color: isDark ? "#FFF" : "#000",
					},
				}}
			/>
			<Drawer.Screen
				name="filter"
				options={{
					drawerLabel: t("drawer:filterLabel"),
					title: t("drawer:filterLabel"),
					drawerLabelStyle: {
						color: isDark ? "#FFF" : "#000",
					},
				}}
			/>
			<Drawer.Screen
				name="rules"
				options={{
					drawerLabel: t("drawer:rulesLabel"),
					title: t("drawer:rulesLabel"),
					drawerLabelStyle: {
						color: isDark ? "#FFF" : "#000",
					},
				}}
			/>
			<Drawer.Screen
				name="css"
				options={{
					drawerLabel: t("drawer:cssLabel"),
					title: t("drawer:cssLabel"),
					drawerLabelStyle: {
						color: isDark ? "#FFF" : "#000",
					},
				}}
			/>
			<Drawer.Screen
				name="polls"
				options={{
					drawerLabel: t("drawer:pollsLabel"),
					title: t("drawer:pollsLabel"),
					drawerLabelStyle: {
						color: isDark ? "#FFF" : "#000",
					},
				}}
			/>
			<Drawer.Screen
				name="changelogs"
				options={{
					drawerLabel: t("drawer:changelogsLabel"),
					title: t("drawer:changelogsLabel"),
					drawerLabelStyle: {
						color: isDark ? "#FFF" : "#000",
					},
				}}
			/>
			<Drawer.Screen
				name="contact"
				options={{
					drawerLabel: t("drawer:contactLabel"),
					title: t("drawer:contactLabel"),
					drawerLabelStyle: {
						color: isDark ? "#FFF" : "#000",
					},
				}}
			/>
			<Drawer.Screen
				name="search"
				options={{
					drawerLabel: "Search",
					title: "Search",
					drawerLabelStyle: {
						color: isDark ? "#FFF" : "#000",
					},
					drawerItemStyle: { display: "none" },
				}}
			/>
			<Drawer.Screen
				name="settings"
				options={{
					drawerLabel: t("drawer:settingsLabel"),
					title: t("drawer:settingsLabel"),
					drawerLabelStyle: {
						color: isDark ? "#FFF" : "#000",
					},
				}}
			/>
			<Drawer.Screen
				name="create"
				options={{
					drawerLabel: "Create",
					title: "Create",
					drawerLabelStyle: {
						color: isDark ? "#FFF" : "#000",
					},
					drawerItemStyle: { display: "none" },
				}}
			/>
		</Drawer>
	);
};

export default DrawerLayout;
