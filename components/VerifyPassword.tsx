import React, { useState } from "react";
import { TextInput, type TextInputProps, View } from "react-native";
import styles from "@/assets/style";
import { fetchurl } from "@/scripts/fetchurl";
import { Toast } from "toastify-react-native";
import { ThemedText } from "./ThemedText";
import { CustomButton } from "./CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";

export type VerifyPasswordProps = TextInputProps & {
    objectId?: '',
    password?: '',
    lightColor?: string;
    darkColor?: string;
}

export function VerifyPassword({
    objectId = '' ,
    password = '',
    setObject = () => {},
    lightColor,
    darkColor
}: VerifyPasswordProps) {
    const backgroundColor = useThemeColor({ light: "#FFF", dark: "#FFF" }, 'background');

    const [rawFormData, setRawFormData] = useState({
        confirmsecretpassword: ''
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
                <ThemedText type="default">This secret requires a password</ThemedText>
                <TextInput
                    style={[{ backgroundColor },styles.formControl, styles.mb3]}
                    onChangeText={e => {
                        setRawFormData({
                            ...rawFormData,
                            confirmsecretpassword: e
                        })
                    }}
                    value={confirmsecretpassword}
                    placeholder="Type password to reveal secret"
                    keyboardType="default"
                    secureTextEntry={true}
                />
                <View style={[styles.fixToText]}>
                    <CustomButton title="Clear" onPress={resetForm} lightColor="#000" darkColor="#000" />
                    <CustomButton title={btnText} onPress={sendPassword} lightColor="#000" darkColor="#000" />
                </View>
            </View>
  
}
