import React from 'react'
import { View, Alert, Share } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedText } from '../ThemedText';
import { ExternalLink } from '../ExternalLink';
import { CustomButton } from '../CustomButton';
import { useTranslation } from 'react-i18next';

export default function CustomDrawerContent(props:any) {

    const { bottom } = useSafeAreaInsets();

    const shareApp = async () => {
        try {
            const res = await Share.share({
                message: 'https://play.google.com/store/apps/details?id=com.kirasiris.anonymoussecretsapp'
            });

            if(res.action === Share.sharedAction) {
                if(res.activityType) {
                    // shared with activity type of res.activityType
                } else {
                    // shared
                }
            } else if (res.action === Share.dismissedAction) {
                // dimissed
            }
        } catch (err) {
            Alert.alert(err.message);
        }
    }

    const { t } = useTranslation();


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
            <View
                style={{
                    paddingHorizontal: 10,
                    paddingBottom: bottom + 10
                }}
            >
                <CustomButton title={t("drawermenu:shareAppItem")} onPress={shareApp} lightColor="#000" darkColor="#000" />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <ExternalLink
                        href="https://play.google.com/store/apps/details?id=com.kirasiris.anonymoussecretsapp"
                    >
                            <ThemedText type="link">{t("drawermenu:rateAppItem")}</ThemedText>
                    </ExternalLink>
                    <ExternalLink
                        href="https://github.com/kirasiris/anonymous-secrets-app"
                    >
                            <ThemedText type="link">GitHub</ThemedText>
                    </ExternalLink>
                </View>
                <ThemedText type="default">{process.env.EXPO_PUBLIC_APP_VERSION} {t("drawermenu:byKevinItem")}
                    <ExternalLink href="https://kevinfonseca.vercel.app/">
                        <ThemedText type="link"> Kevin</ThemedText>
                    </ExternalLink>
                </ThemedText>
            </View>
        </View>
    )
};