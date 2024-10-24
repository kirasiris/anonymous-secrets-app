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
    btn: {
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: 'transparent',
        verticalAlign: 'middle',
        textDecorationLine: 'none',
        textAlign: 'center',
        color: '#DEE2E6',
        lineHeight: 1.5,
        fontWeight: '400',
        fontSize: 16,
        paddingVertical: 15,
        paddingHorizontal: 12,
    },
    btnOutlineLight: {
        color: '##f8f9fa',
        borderColor: '#f8f9fa',
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
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
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
    // SINGLE
    flag: {
        width: 30,
        height: 15,
        marginTop: 10
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