import { Button, ScrollView, TextInput, View, Text } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Toast } from 'toastify-react-native';
import { fetchurl } from '@/scripts/fetchurl';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import styles from '@/assets/style';

export default function SearchScreen() {
  const router = useRouter();

  const [rawFormData, setRawFormData] = useState({
    _id: ''
  });

  const { _id } = rawFormData;

  const [btnText, setBtnText] = useState('Submit');

  const searchSecret = async (e: any) => {
    setBtnText('...')
    const res = await fetchurl(
        `/extras/secrets/${_id}`, //url
        "GET", // method
        "default",// cache
        rawFormData, // body
        undefined, // signal
        false, // multipart
        false, // is remote
    );
    if(res.status === 'error') {
      Toast.error(res.message, 'bottom');
      setBtnText('Submit');
      return;
    }
    Toast.success('Secret found', 'bottom');
    resetForm();
    setBtnText('Submit');
    router.push(`/read/${res?.data?._id}`);
  }

  const resetForm = () => {
    setRawFormData({
      _id: ''
    });
  }


  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Search',
          headerTitleAlign: 'center',
          headerLeft: () => <Link href={`/`} style={[styles.filterIcon, { color: '#FFF' }]}>Home</Link>,
          headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' color="#FFFFFF" style={[styles.filterIcon]} /></Link>,
          headerStyle: {
            backgroundColor: '#0163D2'
          },
          headerTitleStyle: {
            color: "#FFFFFF",
          },
        }}
      />
      <View style={[styles.container]}>
        <Text style={[styles.labelText]}>Enter ID</Text>
        <TextInput
          style={[styles.formControl, styles.mb3]}
          onChangeText={e => {
            setRawFormData({
              ...rawFormData,
              _id: e
            })
          }}
          value={_id}
          placeholder="00000AF0FFGFGERGRGFFB"
          keyboardType='default'
        />
        <View style={[styles.fixToText]}>
          <Button title='Clear' onPress={resetForm} />
          <Button title={btnText} onPress={searchSecret} />
        </View>
      </View>
    </ScrollView>
  );
}