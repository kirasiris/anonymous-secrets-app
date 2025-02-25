import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const CustomIcon = ({ icon = undefined, size = 25, ...rest }) => {
	return <FontAwesomeIcon icon={icon} size={size} {...rest} />;
};

export default CustomIcon;
