import React, { useState } from 'react';
import { View, TouchableOpacity, Button, Text } from 'react-native';
import { Link } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { ThemedText } from '../ThemedText';
import { TabBarIcon } from '../navigation/TabBarIcon';
import { calculateTimeSincePublished } from '@/scripts/calculatetimesincepublished';
import { Flag } from '../Flag';
import { ReportModal } from '../ReportModal';
import styles from '@/assets/style';

export function Single({ object = {}, isSingle = true }) {

    const copyId = async () => {
      await Clipboard.setStringAsync(object._id);
    };

    const copyText = async () => {
        await Clipboard.setStringAsync(object.text);
    }

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
                        }}
                        >
                            <View style={[styles.cardTitleContainer]}>
                                <ThemedText style={[styles.cardTitle]}>{object.title}</ThemedText>
                            </View>
                    </Link>
                    <View style={styles.cardSubtitle}>
                        <ThemedText type="default" style={styles.cardHandle}>{object.age}&nbsp;years&nbsp;old&nbsp;</ThemedText>
                        <ThemedText type="default" style={styles.cardHandle}>&nbsp;about&nbsp;{calculateTimeSincePublished(object.createdAt)}&nbsp;from&nbsp;{object.state}</ThemedText>
                    </View>
                    <View style={styles.cardSubtitle}>
                        <Flag flag={object.state} style={[{ marginRight: 5 }]} />
                        <ThemedText type="default" style={[styles.cardHandle]} onPress={copyId}>Click me to copy Object Id</ThemedText>
                    </View>
                </View>
            </View>
            {/* TEXT */}
            {object.nsfw ? 
            <ThemedText type="default" style={[styles.cardText, styles.nsfwCardText]} onLongPress={copyText}>THIS ENTRY IS NSFW. READ IT AT YOUR OWN RISK...</ThemedText> :
            <ThemedText type="default" style={[styles.cardText]} onLongPress={copyText}>{object.text}</ThemedText>}
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
                                color: "#1DA1F2"
                            }}>
                                Read&nbsp;More&nbsp;&gt;&gt;
                        </ThemedText>
                    </Link>            
                )}
                <TouchableOpacity style={[styles.cardIcon]} onPress={copyText}>
                    <ThemedText
                        type="default"
                        style={{
                            fontSize: 14,
                            color: "#1DA1F2"
                        }}>
                            Copy Text
                        </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cardIcon]}>
                    <ReportModal resourceId={object._id} postType="secret" onModel="Secret" lightColor="#FFF" darkColor="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}