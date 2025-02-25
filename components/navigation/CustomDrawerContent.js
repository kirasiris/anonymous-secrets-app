import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import { Share, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import ThemedText from "../ThemedText";
import CustomButtom from "../CustomButton";
import ExternalLink from "../ExternalLink";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";

const CustomDrawerContent = (props) => {
	const { bottom } = useSafeAreaInsets();

	const shareApp = async () => {
		try {
			const res = await Share.share({
				message: process.env.EXPO_PUBLIC_ANONYMOUS_SECRETS_APP_URL,
			});

			if (res.action === Share.sharedAction) {
				if (res.activityType) {
					// shared with activity type
				} else {
					// shared
				}
			} else if (res.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (err) {
			Toast.error(err.message, "bottom");
		}
	};

	// Here goes the translation
	const { t } = useContext(LanguageContext);

	// Manage app's theme
	const { theme } = useContext(ThemeContext);
	const isDark = theme === "dark";

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: isDark ? "#16181b" : "#FFF",
				color: isDark ? "#FFF" : "#000",
			}}
		>
			{/* THIS IS SUPPOSED TO BE A WRAPPER FOR THE DRAWER ITEMS */}
			<DrawerContentScrollView {...props}>
				{/* HERE GOES A LOGO IDEALLY */}
				{/* <View style={[{ padding: 20 }]}>
                    <ThemedText type="default">Hola</ThemedText>
                </View> */}
				{/* THIS IS SUPPOSED TO BE THE REST OF THE NAVIGATION */}
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
			{/* CUSTOM LINK/CODE/CRAP */}
			<View style={[{ paddingHorizontal: 10, paddingBottom: bottom + 10 }]}>
				<CustomButtom
					title={t("drawer:shareAppLabel")}
					onPress={shareApp}
					color="#000"
				/>
				<View
					style={[{ flexDirection: "row", justifyContent: "space-between" }]}
				>
					<ExternalLink
						href={process.env.EXPO_PUBLIC_ANONYMOUS_SECRETS_APP_URL}
					>
						<ThemedText type="link">{t("drawer:rateAppLabel")}</ThemedText>
					</ExternalLink>
					<ExternalLink href={process.env.EXPO_PUBLIC_GITHUB_REPOSITORY_URL}>
						<ThemedText type="link">GitHub</ThemedText>
					</ExternalLink>
				</View>
				<ThemedText type="default" style={{ color: isDark ? "#FFF" : "#000" }}>
					{process.env.EXPO_PUBLIC_APP_VERSION}
					<ExternalLink href={process.env.EXPO_PUBLIC_OWNER_URL}>
						<ThemedText type="link"> Kevin</ThemedText>
					</ExternalLink>
				</ThemedText>
			</View>
		</View>
	);
};

export default CustomDrawerContent;
