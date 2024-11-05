import { PixelRatio, ScrollView, TextInput, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import Dropdown from 'react-native-input-select';
import { Toast } from 'toastify-react-native';
import { fetchurl } from '@/scripts/fetchurl';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import styles from '@/assets/style';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CustomButton } from '@/components/CustomButton';


export default function ContactScreen() {
  const backgroundColor = useThemeColor({ light: "#FFF", dark: "#FFF" }, 'background');

  const [rawFormData, setRawFormData] = useState({
      name: '',
      email: '',
      subject: '',
      text: ''
  });

  const {name, email, subject, text} = rawFormData;

  const [btnText, setBtnText] = useState('Submit');

  const sendEmail = async () => {
    setBtnText('...')
    const res = await fetchurl(
      `/emails`, // url
      "POST", // method
      "no-cache", // cache
      rawFormData, // body
      undefined, // signal
      false, // multipart
      false // is remote
    )
    if(res.status === 'error') {
      Toast.error(res.message, 'bottom');
      setBtnText('Submit');
      return;
    };
    Toast.success('Email sent', 'bottom');
    resetForm();
    setBtnText('Submit');
  }

  const resetForm = () => {
    setRawFormData({
      name: '',
      email: '',
      subject: '',
      text: ''
    })
  }

  // Get the font scale factor
  const scale = PixelRatio.getFontScale();

  // Define a font size based on scale factor
  const scaledFontSize = 16 * scale;

  return (
    <>
      <Stack.Screen options={{
          headerShown: true,
          title: 'Contact',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: scaledFontSize, // Use scaled font size
          },
          // headerLeft: () => <Text>Example Left</Text>,
          headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={styles.filterIcon} /></Link>
      }} />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView>
          <View style={[styles.container]}>
            <ThemedText type="default" style={[styles.labelText]}>Name</ThemedText>
            <TextInput
              style={[{ backgroundColor }, styles.formControl, styles.mb3]}
              onChangeText={e => {
                setRawFormData({
                  ...rawFormData,
                  name: e
                })
              }}
              value={name}
              placeholder='John Doe'
              keyboardType='default'
            />
            <ThemedText type="default" style={[styles.labelText]}>Email</ThemedText>
            <TextInput
              style={[{ backgroundColor }, styles.formControl, styles.mb3]}
              onChangeText={e => {
                setRawFormData({
                  ...rawFormData,
                  email: e
                })
              }}
              value={email}
              placeholder='john@doe.com'
              keyboardType='email-address'
            />
            <ThemedText type="default" style={[styles.labelText]}>Subject</ThemedText>
            <Dropdown
              label={undefined}
              placeholder="Select an option..."
              options={[
                { label: 'Suggestion', value: 'suggestion' },
                { label: 'Bug', value: 'bug' },
                { label: 'Review', value: 'review' },
                { label: 'Greetings', value: 'greetings' }
              ]}
              selectedValue={subject}
              onValueChange={(e: any) => {
                setRawFormData({
                  ...rawFormData,
                  subject: e
                })
              }}
            />
            <ThemedText type="default" style={[styles.labelText]}>Message</ThemedText>
            <TextInput
              style={[{ backgroundColor }, styles.formControl, styles.mb3]}
              onChangeText={e => {
                setRawFormData({
                  ...rawFormData,
                  text: e
                })
              }}
              value={text}
              placeholder='Here goes the message'
              keyboardType="default"
              multiline={true}
              numberOfLines={4}
            />
            <View style={[styles.fixToText, { marginBottom: 5 }]}>
              <CustomButton title="Clear" onPress={resetForm} lightColor="#000" darkColor="#000" />
              <CustomButton title={btnText} onPress={sendEmail} lightColor="#000" darkColor="#000" />
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}
