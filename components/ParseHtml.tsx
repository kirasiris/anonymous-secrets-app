import React from "react";
import { decode } from "html-entities";
import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ParseHtml ({ text = '' }) {

    const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');

    const { width } = useWindowDimensions();

    const decodedText = decode(text);
    
    const tagsStyles = {
        body: {
            color: textColor
        }
    };

    return <RenderHTML source={{ html: decodedText }} contentWidth={width} tagsStyles={tagsStyles} />
};