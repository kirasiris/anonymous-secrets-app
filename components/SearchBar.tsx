import React, { useState } from "react";
import { TextInput, type TextInputProps } from "react-native";
import { fetchurl } from "@/scripts/fetchurl";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";
import styles from "@/assets/style";
import { useThemeColor } from "@/hooks/useThemeColor";

export type SearchBarProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
}

export function SearchBar({
    lightColor,
    darkColor,
    ...otherProps
}: SearchBarProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    const router = useRouter();

    const [rawFormData, setRawFormData] = useState({
        _id: ''
    });

    const { _id } = rawFormData;

    const [btnText, setBtnText] = useState('Search by ID');

    const searchSecret = async (e: any) => {
        setBtnText('...');
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
        router.push(`/home/read/${res?.data?._id}`);
    }

    const resetForm = () => {
        setRawFormData({
            _id: ''
        })
    }

    return (
            <TextInput
                style={[{ backgroundColor }, styles.formControl]}
                onChangeText={e => {
                    setRawFormData({
                        ...rawFormData,
                        _id: e
                    })
                }}
                value={_id}
                placeholder={btnText}
                keyboardType='default'
                returnKeyType="search"
                onSubmitEditing={searchSecret}
                {...otherProps}
            />
    );
}
