import { View } from "react-native";

const ThemedView = ({ children, styleList = {} }) => {
	return <View style={styleList}>{children}</View>;
};

export default ThemedView;
