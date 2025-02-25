import { Button } from "react-native";

const CustomButton = ({ title = "", onPress, ...props }) => {
	return <Button title={title} onPress={onPress} {...props} />;
};

export default CustomButton;
