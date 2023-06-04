import { StyleSheet } from "react-native"
import { blackColor, primaryColor, whiteColor, secondaryColor } from "../../source/commons/styles/style";

const signin = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: "center",
      justifyContent: "space-evenly",
      borderColor: "#c4c4c4",
      borderWidth: 20,
    },
    program: {
      color: blackColor,
      fontWeight: "bold",
    },
    title: {
      color: primaryColor,
      fontWeight: "400",
    },
    buttons: {
      backgroundColor: whiteColor,
      color: blackColor,
    },
    forgot: {
      color: secondaryColor,
      textAlign: "right", 
    },
    login: {
      backgroundColor: primaryColor,
      paddingHorizontal: 50,
      paddingVertical: 10,
    },
    containerButton: {
      
    }
  });

export { signin }