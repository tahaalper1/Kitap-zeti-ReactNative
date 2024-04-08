import { StyleSheet,Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
export default Button_styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        maxWidth: windowWidth - 40,
      },
      buttonText: {
        color: 'white', // Metin rengini buradan değiştirebiliriz
      },
});