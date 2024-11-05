import { PixelRatio, ScrollView, Switch, TextInput, View } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import Dropdown from 'react-native-input-select';
import { Toast } from 'toastify-react-native';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { fetchurl } from '@/scripts/fetchurl';
import styles from '@/assets/style';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CustomButton } from '@/components/CustomButton';

export default function FilterScreen() {
  const backgroundColor = useThemeColor({ light: "#FFF", dark: "#FFF" }, 'background');

  const router = useRouter();
  const params = `?page=1&limit=50&sort=-createdAt&decrypt=true`

  const [rawFormData, setRawFormData] = useState({
    sex: '',
    age: '',
    secondaryage: '',
    estate: '',
    nsfw: false
  });

  const { sex, age, secondaryage, estate, nsfw } = rawFormData;

  const [btnText, setBtnText] = useState('Submit')

  const filterSecrets = async () => {
    setBtnText('...');
    const res = await fetchurl(`/extras/secrets${params}${sex ? `&sex=${sex}` : ""}${age ? `&age[gte]=${Number(age)}` : ""}${secondaryage ? `&age[lte]=${Number(secondaryage)}` : ""}${nsfw ? `&nsfw=${nsfw}` : ""}${estate ? `&state=${estate}` : ""}`, "GET", "no-cache", {});
    if(res.status === 'error') {
      Toast.error(res.message, 'bottom');
      setBtnText('Submit');
      return;
    }
    Toast.success('Secrets fetched', 'bottom');
    resetForm();
    setBtnText('Submit');
    router.push(`/home${params}${sex ? `&sex=${sex}` : ""}${age ? `&age=${Number(age)}` : ""}${secondaryage ? `&secondaryage=${Number(secondaryage)}` : ""}${nsfw ? `&nsfw=${nsfw}` : ""}${estate ? `&estate=${estate}` : ""}`);
  }

  const resetForm = () => {
    setRawFormData({
      sex: '',
      age: '',
      secondaryage: '',
      estate: '',
      nsfw: false
    });
  }

  // Get the font scale factor
  const scale = PixelRatio.getFontScale();

  // Define a font size based on scale factor
  const scaledFontSize = 16 * scale; // Default font size of 16sp

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        title: 'Filter',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: scaledFontSize, // Use scaled font size
        },
        // headerLeft: () => <Text>Example Left</Text>,
        headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={[styles.filterIcon]} /></Link>
      }} />
        <ThemedView style={{ height: '100%' }}>
          <ScrollView>
            <View style={[styles.container]}>
              <ThemedText type="default">From age</ThemedText>
              <TextInput
                id='age'
                style={[{ backgroundColor }, styles.formControl, styles.mb3]}
                onChangeText={e => {
                  const myNumber = parseInt(e.replace(/[^0-9]/g, ''), 10);
                  if (isNaN(myNumber)) return 13;
                  setRawFormData({
                    ...rawFormData,
                    age: Number(myNumber)
                  })
                }}
                value={age}
                placeholder='13'
                keyboardType="numeric"
              />
              <ThemedText type="default">To age</ThemedText>
              <TextInput
                id='secondaryage'
                style={[{ backgroundColor }, styles.formControl, styles.mb3]}
                onChangeText={e => {
                  const myNumber = parseInt(e.replace(/[^0-9]/g, ''), 10);
                  if (isNaN(myNumber)) return 13;
                  setRawFormData({
                    ...rawFormData,
                    secondaryage: Number(myNumber)
                  })
                }}
                value={secondaryage}
                placeholder='99'
                keyboardType="numeric"
              />
              <ThemedText type="default">Sex</ThemedText>
              <Dropdown
                label={undefined}
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
              <ThemedText type="default">State</ThemedText>
              <Dropdown
                label={undefined}
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
                  { label: 'United States Minor Outlying Islands', value: 'UM' },
                  { label: 'Virgin Islands, U.S.', value: 'VI' },
                ]}
                selectedValue={estate}
                onValueChange={(e: any) => {
                  setRawFormData({
                    ...rawFormData,
                    estate: e
                  })
                }}
                isSearchable={true}
              />
              <ThemedText type="default">NSFW</ThemedText>
              <Switch
                id='nsfw'
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
              <View style={[styles.fixToText, { marginBottom: 5 }]}>
                <CustomButton title="Clear" onPress={resetForm} lightColor="#000" darkColor="#000" />
                <CustomButton title={btnText} onPress={filterSecrets} lightColor="#000" darkColor="#000" />
              </View>
            </View>
          </ScrollView>
        </ThemedView>
    </>
  );
}