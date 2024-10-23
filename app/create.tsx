import { Button, ScrollView, Switch, TextInput, View, Text } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import Dropdown from 'react-native-input-select';
import { Toast } from 'toastify-react-native';
import { fetchurl } from '@/scripts/fetchurl';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import styles from '@/assets/style';

export default function CreateScreen() {
  const router = useRouter();

  const [rawFormData, setRawFormData] = useState({
    title: '',
    text: '',
    password: '',
    age: 13,
    sex: '',
    state: '',
    nsfw: false,
    deletable: false
  });

  const { title, text, password, age, sex, state, nsfw, deletable } = rawFormData;

  const [btnText, setBtnText] = useState('Submit');

  const sendSecret = async (e: any) => {
    setBtnText('...')
    const res = await fetchurl(`/extras/secrets`, "POST", "no-cache", rawFormData);
    if(res.status === 'error') {
      Toast.error(res.message, 'bottom');
      setBtnText('Submit');
      return;
    }
    Toast.success('Secret created', 'bottom');
    resetForm();
    setBtnText('Submit');
    router.push(`/read/${res?.data?._id}`);
  }

  const resetForm = () => {
    setRawFormData({
      title: '',
      text: '',
      password: '',
      age: 13,
      sex: '',
      state: '',
      nsfw: false,
      deletable: false
    });
  }


  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Create',
          headerTitleAlign: 'center',
          headerLeft: () => <Link href={`/`} style={[styles.filterIcon]}>Home</Link>,
          headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' color="#000" style={[styles.filterIcon]} /></Link>,
        }}
      />
      <View style={[styles.container]}>
        <Text style={[styles.labelText]}>Name or Title</Text>
        <TextInput
          style={[styles.formControl, styles.mb3]}
          onChangeText={e => {
            setRawFormData({
              ...rawFormData,
              title: e
            })
          }}
          value={title}
          placeholder='John Doe'
          keyboardType='default'
        />
        <Text style={[styles.labelText]}>Text</Text>
        <TextInput
          style={[styles.formControl, styles.mb3]}
          onChangeText={e => {
            setRawFormData({
              ...rawFormData,
              text: e
            })
          }}
          value={text}
          placeholder='No description'
          keyboardType="default"
          multiline={true}
          numberOfLines={4}
        />
        <Text style={[styles.labelText]}>Password - Leave empty if not required</Text>
        <TextInput
          style={[styles.formControl, styles.mb3]}
          onChangeText={e => {
            setRawFormData({
              ...rawFormData,
              password: e
            })
          }}
          value={password}
          placeholder='********'
          secureTextEntry={true}
        />
        <Text style={[styles.labelText]}>Age</Text>
        <TextInput
          style={[styles.formControl, styles.mb3]}
          onChangeText={e => {
            const myNumber = parseInt(e.replace(/[^0-9]/g, ''), 10);
            if (isNaN(myNumber)) return 13;
            setRawFormData({
              ...rawFormData,
              age: myNumber
            })
          }}
          value={age}
          placeholder='Age'
          keyboardType="numeric"
        />
        <Dropdown
          label="Sex"
          placeholder="Select an option..."
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Non-binary', value: 'non-binary' },
          ]}
          selectedValue={sex}
          onValueChange={(e: any) => {
            setRawFormData({
              ...rawFormData,
              sex: e
            })
          }}
        />
        <Dropdown
          label='State'
          placeholder="Select an option..."
          options={[
            { label: 'Alabama', value: 'AL' },
            { label: 'Alaska', value: 'AK' },
            { label: 'Arizona', value: 'AZ' },
            { label: 'Arkansas', value: 'AR' },
            { label: 'California', value: 'CA' },
            { label: 'Colorado', value: 'CO' },
            { label: 'Connecticut', value: 'CT' },
            { label: 'Delaware', value: 'DE' },
            { label: 'Florida', value: 'FL' },
            { label: 'Georgia', value: 'GA' },
            { label: 'Hawaii', value: 'HI' },
            { label: 'Idaho', value: 'ID' },
            { label: 'Illinois', value: 'IL' },
            { label: 'Indiana', value: 'IN' },
            { label: 'Iowa', value: 'IA' },
            { label: 'Kansas', value: 'KS' },
            { label: 'Kentucky', value: 'KY' },
            { label: 'Louisiana', value: 'LA' },
            { label: 'Maine', value: 'ME' },
            { label: 'Maryland', value: 'MD' },
            { label: 'Massachusetts', value: 'MA' },
            { label: 'Michigan', value: 'MI' },
            { label: 'Minnesota', value: 'MN' },
            { label: 'Mississippi', value: 'MS' },
            { label: 'Missouri', value: 'MO' },
            { label: 'Montana', value: 'MT' },
            { label: 'Nebraska', value: 'NE' },
            { label: 'Nevada', value: 'NV' },
            { label: 'New Hampshire', value: 'NH' },
            { label: 'New Jersey', value: 'NJ' },
            { label: 'New Mexico', value: 'NM' },
            { label: 'New York', value: 'NY' },
            { label: 'North Carolina', value: 'NC' },
            { label: 'North Dakota', value: 'ND' },
            { label: 'Ohio', value: 'OH' },
            { label: 'Oklahoma', value: 'OK' },
            { label: 'Oregon', value: 'OR' },
            { label: 'Pennsylvania', value: 'PA' },
            { label: 'Rhode Island', value: 'RI' },
            { label: 'South Carolina', value: 'SC' },
            { label: 'South Dakota', value: 'SD' },
            { label: 'Tennessee', value: 'TN' },
            { label: 'Texas', value: 'TX' },
            { label: 'Utah', value: 'UT' },
            { label: 'Vermont', value: 'VT' },
            { label: 'Virginia', value: 'VA' },
            { label: 'Washington', value: 'WA' },
            { label: 'West Virginia', value: 'WV' },
            { label: 'Wisconsin', value: 'WI' },
            { label: 'Wyoming', value: 'WY' },
            { label: 'District of Columbia', value: 'DC' },
            { label: 'American Samoa', value: 'AS' },
            { label: 'Guam', value: 'GU' },
            { label: 'Northern Mariana Islands', value: 'MP' },
            { label: 'Puerto Rico', value: 'PR' },
            { label: 'Johnston Atoll Island', value: 'JA-UM' },
            { label: 'Midway Island', value: 'MI-UM' },
            { label: 'Wake Island', value: 'WI-UM' },
            { label: 'Virgin Islands, U.S.', value: 'VI' },
          ]}
          selectedValue={state}
          onValueChange={(e: any) => {
            setRawFormData({
              ...rawFormData,
              state: e
            })
          }}
          isSearchable={true}
        />        
        <Text style={[styles.labelText]}>NSFW</Text>
        <Switch
          trackColor={{
            true: '#81b0ff',
            false: '#767577'
          }}
          thumbColor={nsfw ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          value={nsfw}
          onValueChange={(e: any) => {
            setRawFormData({
              ...rawFormData,
              nsfw: e
            })
          }}
        />
        <Text style={[styles.labelText]}>Delete after 24hrs?</Text>
        <Switch
          trackColor={{
            true: '#81b0ff',
            false: '#767577'
          }}
          thumbColor={deletable ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          value={deletable}
          onValueChange={(e: any) => {
            setRawFormData({
              ...rawFormData,
              deletable: e
            })
          }}
        />
        <View style={[styles.fixToText]}>
          <Button title='Clear' onPress={resetForm} />
          <Button title={btnText} onPress={sendSecret} />
        </View>
      </View>
    </ScrollView>
  );
}