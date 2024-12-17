import React from 'react';
import { View, TouchableOpacity, Alert, Share } from 'react-native';
import { Link } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { ThemedText } from '../ThemedText';
import { TabBarIcon } from '../navigation/TabBarIcon';
import { calculateTimeSincePublished } from '@/scripts/calculatetimesincepublished';
// import { calculateTimeSincePublished } from "befree-utilities";
import { Flag } from '../Flag';
import { ReportModal } from '../ReportModal';
import styles from '@/assets/style';
import { useTranslation } from 'react-i18next';

export function Single({ object = {}, isSingle = true }) {

    const shareSecret = async () => {
        try {
            const res = await Share.share({
                message: `${process.env.EXPO_PUBLIC_OWNER_URL}/secret/${object._id}`
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

    const copyId = async () => {
      await Clipboard.setStringAsync(object._id);
    };

    const copyText = async () => {
        await Clipboard.setStringAsync(object.text);
    }

    const { t } = useTranslation();

    return (
        <View style={[styles.card]}>
            {/* User info section */}
            <View style={[styles.cardInfo]}>
                {/* SEX */}
                {object.sex === 'male' && <TabBarIcon name='male' color="#2e6889" />}
                {object.sex === 'female' && <TabBarIcon name='female' color="#a23d63" />}
                {object.sex === 'non-binary' && <TabBarIcon name='male-female' color="#000000" />}
                {/* DETAILS */}
                <View style={[styles.cardDetails]}>
                    <Link
                        href={{
                            pathname: `/home/read/${object._id}`,
                            // params: {}
                        }}
                        >
                            <View style={[styles.cardTitleContainer]}>
                                <ThemedText style={[styles.cardTitle]}>{object.title}</ThemedText>
                            </View>
                    </Link>
                    <View style={[styles.cardSubtitle]}>
                        <ThemedText type="default" style={[styles.cardHandle]}>{object.age}&nbsp;years&nbsp;old&nbsp;</ThemedText>
                        <ThemedText type="default" style={[styles.cardHandle]}>&nbsp;about&nbsp;{calculateTimeSincePublished(object.createdAt)}&nbsp;from&nbsp;{object.state}</ThemedText>
                    </View>
                    <View style={[styles.cardSubtitle]}>
                        <Flag flag={object.state} style={[{ marginRight: 5 }]} />
                        <ThemedText type="default" style={[styles.cardHandle]} onPress={copyId}>{t("common:copyObjectId")}</ThemedText>
                    </View>
                </View>
            </View>
            {/* TEXT */}
            {/* Display it on index page if NSFW */}
            {object.nsfw && !isSingle && (
                <ThemedText
                    type="default"
                    style={[styles.cardText, styles.nsfwCardText]}
                >
                    {t("common:NSFWWarning")}
                </ThemedText>
            )}
            {/* Full NSFW content on single page */}
            {object.nsfw && isSingle && (
                <ThemedText
                    type="default"
                    style={[styles.cardText]}
                    onLongPress={copyText}
                >
                    {object.text}
                </ThemedText>
            )}
            {/* Password-protected message on index page */}
            {object.password && !isSingle && (
                <ThemedText
                    type="default"
                    style={[styles.cardText]}
                >
                    {t("common:passwordRequired")}
                </ThemedText>
            )}
            {/* Display text if SFW and not password-protected */}
            {!object.nsfw && !object.password && !isSingle && (
                <ThemedText
                    type="default"
                    style={[styles.cardText]}
                    onLongPress={copyText}
                >
                    {object.text}
                </ThemedText>
            )}
            {/* Display text if SFW and not password-protected */}
            {!object.nsfw && !object.password && isSingle && (
                <ThemedText
                    type="default"
                    style={[styles.cardText]}
                    onLongPress={copyText}
                >
                    {object.text}
                </ThemedText>
            )}
            {/* FOOTER */}
            <View style={styles.cardFooter}>
                {!isSingle && (
                    <Link
                        href={{
                            pathname: `/home/read/${object._id}`,
                            // params: {}
                        }}
                        style={[styles.cardIcon]}
                    >
                        <ThemedText
                            type="default"
                            style={[{
                                fontSize: 14,
                                color: "#1DA1F2"
                            }]}>
                                {t("common:readMoreLink")}
                        </ThemedText>
                    </Link>            
                )}
                <TouchableOpacity style={[styles.cardIcon]} onPress={shareSecret}>
                    <ThemedText
                        type="default"
                        style={[{
                            fontSize: 14,
                            color: "#1DA1F2"
                        }]}
                    >
                        {t("common:shareLink")}
                    </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cardIcon]} onPress={copyText}>
                    <ThemedText
                        type="default"
                        style={[{
                            fontSize: 14,
                            color: "#1DA1F2"
                        }]}>
                            {t("common:copyTextLink")}
                        </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cardIcon]}>
                    <ReportModal resourceId={object._id} postType="secret" onModel="Secret" lightColor="#FFF" darkColor="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}