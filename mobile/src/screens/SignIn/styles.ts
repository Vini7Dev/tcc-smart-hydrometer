import { StyleSheet } from 'react-native'
import { blackColor, primaryColor, whiteColor, secondaryColor } from '../../styles/variables'

const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 100,
      alignItems: "center",
    },
    logoImage: {
      marginBottom: 10,
    },
    program: {
      marginBottom: 62,
      fontFamily: 'Nunito',
      fontWeight: '700',
      fontSize: 24,
      lineHeight: 33,
      color: blackColor,
    },
    title: {
      marginBottom: 32,
      color: primaryColor,
      fontFamily: 'Nunito',
      fontWeight: '700',
      fontSize: 24,
      lineHeight: 33,
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
  })

export { loginStyles }
