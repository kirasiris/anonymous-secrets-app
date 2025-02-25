import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Toast } from "toastify-react-native";
import fetchurl from "../scripts/fetchurl";
import { TextInput } from "react-native";
import styles from "../assets/style";
import { LanguageContext } from "../context/LanguageContext";

const SearchBar = ({ ...otherProps }) => {
	const router = useRouter();

	const [rawFormData, setRawFormData] = useState({
		_id: "",
	});

	const { _id } = rawFormData;

	// Here goes the translation
	const { t } = useContext(LanguageContext);

	const [btnText, setBtnText] = useState(t("search:searchBarPlaceholder"));

	const searchSecret = async (e) => {
		setBtnText("...");
		const res = await fetchurl(
			`/extras/secrets/${_id}`, //url
			"GET", // method
			"default", // cache
			rawFormData, // body
			undefined, // signal
			false, // multipart
			false // is remote
		);
		if (res.status === "error") {
			Toast.error(res.message, "bottom");
			setBtnText("Submit");
			return;
		}
		Toast.success("Secret found", "bottom");
		resetForm();
		setBtnText("Submit");
		router.push(`/home/read/${res?.data?._id}`);
	};

	const resetForm = () => {
		setRawFormData({
			_id: "",
		});
	};

	return (
		<TextInput
			style={[
				styles.formControl,
				{
					backgroundColor: "#FFF",
				},
			]}
			onChangeText={(e) => {
				setRawFormData({ ...rawFormData, _id: e });
			}}
			value={_id}
			placeholder={btnText}
			keyboardType="default"
			returnKeyType="search"
			onSubmitEditing={searchSecret}
			{...otherProps}
		/>
	);
};

export default SearchBar;
