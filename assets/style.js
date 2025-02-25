import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	// GLOBAL
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
	btn: {
		borderWidth: 1,
		borderRadius: 6,
		backgroundColor: "transparent",
		verticalAlign: "middle",
		textDecorationLine: "none",
		textAlign: "center",
		color: "#DEE2E6",
		fontWeight: "400",
		fontSize: 16,
		paddingVertical: 5,
		paddingHorizontal: 12,
	},
	btnOutlineLight: {
		color: "##f8f9fa",
		borderColor: "#f8f9fa",
	},
	btnPrimary: {
		backgroundColor: "#2196f3",
	},
	btnDark: {
		backgroundColor: "#000000",
	},
	mb3: {
		marginBottom: 16,
	},
	container: {
		marginTop: 15,
		marginHorizontal: 15,
	},
	headerRightContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 11,
	},
	leftButton: {
		marginLeft: 11,
		color: "#FFFFFF",
	},
	rightButton: {
		marginLeft: 11,
		color: "#FFFFFF",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	// SINGLE
	flag: {
		width: 20,
		height: 10,
		marginTop: 5,
	},
	// 404 ERROR PAGE
	errorpage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	// EXTRAS
	filterIcon: {
		marginHorizontal: 11,
	},
	headerIcons: {
		color: "#FFFFFF",
		marginVertical: 15,
	},
	// FORM
	labelText: {
		marginBottom: 10,
	},
	formControl: {
		width: "100%",
		paddingVertical: 12,
		paddingHorizontal: 12,
		fontSize: 16,
		fontWeight: "400",
		// color: "#212529",
		// backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#DEE2E6",
		borderRadius: 0,
		minHeight: 48,
	},
	fixToText: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 15,
	},
	// SINGLE SECRET
	card: {
		padding: 10,
		// marginVertical: 5,
		borderBottomWidth: 1,
		borderBottomColor: "#CCCCCC",
	},
	cardInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	cardDetails: {
		flexDirection: "column",
		marginLeft: 10,
	},
	cardTitleContainer: {
		flexDirection: "row", // important for wrapping
		flexWrap: "wrap", // allows wrapping of text
		width: 300,
	},
	cardTitle: {
		fontWeight: "bold",
		fontSize: 15,
	},
	cardSubtitle: {
		flexDirection: "row",
		alignItems: "center",
	},
	cardText: {
		fontSize: 14,
		marginVertical: 10,
	},
	nsfwCardText: {
		fontWeight: "bold",
		textAlign: "center",
	},
	cardHandle: {
		color: "gray",
		fontSize: 14,
	},
	cardFooter: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	cardIcon: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},

	// MODAL
	modalCentered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		padding: 10,
		position: "absolute",
		width: "100%",
		height: "auto",
	},
});

export default styles;
