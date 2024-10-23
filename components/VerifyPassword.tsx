import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import styles from "@/assets/style";
import { fetchurl } from "@/scripts/fetchurl";
import { Toast } from "toastify-react-native";

export function VerifyPassword({ objectId = '' , password = '', setObject = (data: any) => {} }) {

    const [rawFormData, setRawFormData] = useState({
        confirmsecretpassword: password
    });

    const { confirmsecretpassword } = rawFormData;

    const [btnText, setBtnText] = useState('Submit')

    const sendPassword = async (e: any) => {
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
        if(res.status === 'error' || res.status === 'fail') {
            Toast.error(res.message, 'bottom');
            setBtnText('Submit');
            return;
        }
        Toast.success('Secret revealed', 'bottom');
        resetForm();
        setObject(res.data);
    }

    const resetForm = () => {
        setRawFormData({
            confirmsecretpassword: password
        })
    }

    return  <View style={[styles.container]}>
                <Text>This secret requires a password</Text>
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
