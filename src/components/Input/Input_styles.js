import { StyleSheet,Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
export default Input_styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputFocused: {
    borderColor: '#007AFF',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
});