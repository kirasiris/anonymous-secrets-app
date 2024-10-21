import { Button, ScrollView, TextInput, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import Dropdown from 'react-native-input-select';
import { Toast } from 'toastify-react-native';
import { fetchurl } from '@/scripts/fetchurl';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import styles from '@/assets/style';


export default function ContactScreen() {

  const [rawFormData, setRawFormData] = useState({
      name: '',
      email: '',
      subject: '',
      text: ''
  });

  const {name, email, subject, text} = rawFormData;

  const [btnText, setBtnText] = useState('Submit');

  const sendEmail = async (e : any) => {
    setBtnText('...')
    const res = await fetchurl(`/emails`, "POST", "no-cache", rawFormData)
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
    
  return (
    <ScrollView>
      <Stack.Screen options={{
        headerShown: true,
        title: 'Contact',
        headerTitleAlign: 'left',
        // headerLeft: () => <Text>Example Left</Text>,
        headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' color="#000" style={styles.filterIcon} /></Link>
      }} />
      <View style={[styles.container]}>
        <TextInput
          style={[styles.formControl, styles.mb3]}
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
        <TextInput
          style={[styles.formControl, styles.mb3]}
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
        <Dropdown
          label="Subject"
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
        <TextInput
          style={[styles.formControl, styles.mb3]}
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
        <View style={styles.fixToText}>
          <Button title='Clear' onPress={resetForm} />
          <Button title={btnText} onPress={sendEmail} />
        </View>
      </View>
    </ScrollView>
  );
}
