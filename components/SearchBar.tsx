import { useState } from "react";
import {TextInput } from "react-native";
import { fetchurl } from "@/scripts/fetchurl";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";
import styles from "@/assets/style";

export function SearchBar({}) {
    const router = useRouter();

    const [rawFormData, setRawFormData] = useState({
        _id: ''
    });

    const { _id } = rawFormData;

    const searchSecret = async (e: any) => {
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
          return;
        }
        Toast.success('Secret found', 'bottom');
        resetForm();
        router.push(`/read/${res?.data?._id}`);
    }

    const resetForm = () => {
        setRawFormData({
            _id: ''
        })
    }

    return <TextInput
        style={[styles.formControl, styles.mb3]}
        onChangeText={e => {
            setRawFormData({
                ...rawFormData,
                _id: e
            })
        }}
        value={_id}
        placeholder="Search ID"
        keyboardType='default'
        returnKeyType="search"
        onSubmitEditing={searchSecret}
    />
}
