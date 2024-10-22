import React from 'react';
import { Platform } from 'react-native';
import WebView from 'react-native-webview';

export function ParseHtml({text = '', styleList = {} }) {

    return <WebView source={{ html: text }} style={styleList} />

    // Platform.OS === "web" && 

};
