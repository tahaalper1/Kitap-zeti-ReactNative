// BottomSheet.styles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
  },
  innerContainer: {
    alignItems: 'center',
    gap:20,
  },
  imageButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
});
