import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // GLOBAL
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    },
    mb3: {
        marginBottom: 16
    },
    container: {
        marginTop: 15,
        marginHorizontal: 15
    },
    icon: {
        padding: 10
    },
    leftButton: {
        marginHorizontal: 11,
        color: "#FFFFFF"
    },
    rightButton: {
        marginHorizontal: 11,
        color: "#FFFFFF"
    },
    link: {
        marginTop: 15,
        paddingVertical: 15
    },
    // 404 ERROR PAGE
    errorpage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    // EXTRAS
    filterIcon: {
        marginHorizontal: 11
    },
    // FORM
    labelText: {
        marginBottom: 10
    },
    formControl: {
        width: '100%',
        paddingVertical: 6,
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: "400",
        color: "#212529",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#DEE2E6",
        borderRadius: 0
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    // INDEX
    postContainer: {
        flexDirection: 'row',
        padding: 10
    },
    leftContainer: {
        marginRight: 10,
        alignItems: 'center'
    },
    rightContainer: {
        flex: 1
    },
    age: {
        marginTop: 5,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: "#CCCCCC",
        padding: 5
    },
    nsfwcontent: {
        fontSize: 16,
        fontWeight: "600",
        marginVertical: "auto",
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 0,
        borderColor: "#CCCCCC",
        padding: 5
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#CCCCCC"
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8
    }
})

export default styles;