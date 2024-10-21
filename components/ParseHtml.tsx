import React from 'react';
import WebView from 'react-native-webview';

export function ParseHtml({text = '', styleList = {} }) {

    return <WebView source={{ html: text }} style={styleList} />

};
