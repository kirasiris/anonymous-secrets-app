import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { TabBarIcon } from '../navigation/TabBarIcon';
import { calculateTimeSincePublished } from '@/scripts/calculatetimesincepublished';
import { Flag } from '../Flag';
import { ReportModal } from '../ReportModal';
import styles from '@/assets/style';
import { Link } from 'expo-router';

export function Single({ object = {}, isSingle = true }) {
    return (
        <View style={styles.card}>
            {/* User info section */}
            <View style={styles.cardInfo}>
                {/* SEX */}
                {object.sex === 'male' && <TabBarIcon name='male' color="#2e6889" />}
                {object.sex === 'female' && <TabBarIcon name='female' color="#a23d63" />}
                {object.sex === 'non-binary' && <TabBarIcon name='male-female' color="#000000" />}
                {/* DETAILS */}
                <View style={styles.cardDetails}>
                    <Link
                        href={{
                            pathname: `/read/${object._id}`,
                            // params: {}
                    }}>
                        <ThemedText type="subtitle" style={styles.cardTitle}>{object.title}</ThemedText>
                    </Link>
                    <View style={styles.cardSubtitle}>
                        <ThemedText type="default" style={styles.cardHandle}>{object.age}&nbsp;years&nbsp;old&nbsp;</ThemedText>
                        <ThemedText type="default" style={styles.cardHandle}>&nbsp;about&nbsp;{calculateTimeSincePublished(object.createdAt)}&nbsp;from&nbsp;{object.state}</ThemedText>
                    </View>
                    <Flag flag={object.state} />
                </View>
            </View>
            {/* TEXT */}
            {object.nsfw ? 
            <ThemedText type="default" style={[styles.cardText, styles.nsfwCardText]}>THIS ENTRY IS NSFW. READ IT AT YOUR OWN RISK...</ThemedText> :
            <ThemedText type="default" style={[styles.cardText]}>{object.text}</ThemedText>}
            {/* FOOTER */}
            <View style={styles.cardFooter}>
                {isSingle && (
                    <Link
                        href={{
                            pathname: `/read/${object._id}`,
                            // params: {}
                        }}
                        style={[styles.cardIcon]}
                    >
                        <ThemedText
                            type="default"
                            style={{
                                fontSize: 14,
                                color: "#1DA1F2",
                                marginHorizontal: 5
                            }}>
                                Read&nbsp;More&nbsp;&gt;&gt;
                        </ThemedText>
                    </Link>            
                )}
                <TouchableOpacity style={[styles.cardIcon]}>
                    <ReportModal resourceId={object._id} postType="secret" onModel="Secret" lightColor="#FFF" darkColor="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}