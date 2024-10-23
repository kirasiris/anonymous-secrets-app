import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import styles from "@/assets/style";
import { fetchurl } from "@/scripts/fetchurl";

export function VerifyPassword({ objectId = '' , str = '', setObject = (data: any) => {} }) {

    const [rawFormData, setRawFormData] = useState({
        confirmsecretpassword: str
    });

    const { confirmsecretpassword } = rawFormData;

    const [btnText, setBtnText] = useState('Submit')

    const sendPassword = async (e: any) => {
        try {
            setBtnText('...');
            const res = await fetchurl(
                `/extras/secrets/${objectId}/confirmsecretpassword`, //url
                "POST", // method
                "default",// cache
                rawFormData, // body
                undefined, // signal
                false, // multipart
                false, // is remote
            );
    
            setObject(res.data);
        } catch (err) {
            console.log('Error fetching secret with password:', err)
        }
    }

    const resetForm = () => {
        setRawFormData({
            confirmsecretpassword: str
        })
    }

    return  <View style={[styles.container]}>
                <Text style={[styles.mb3]}>This secret requires a password</Text>
                <TextInput
                    style={[styles.formControl, styles.mb3]}
                    onChangeText={e => {
                        setRawFormData({
                            ...rawFormData,
                            confirmsecretpassword: e
                        })
                    }}
                    value={confirmsecretpassword}
                    placeholder="Type password to reveal secret"
                    secureTextEntry={true}
                />
                <View style={[styles.fixToText]}>
                    <Button title="Clear" onPress={resetForm} />
                    <Button title={btnText} onPress={sendPassword} />
                </View>
            </View>
  
}
