import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"#007AFF",
  },
  searchInput: {
    borderWidth: 1,
    marginLeft:5,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: windowWidth * 0.55, 
    marginRight: 16,
  },
  settingsButton: {
    marginLeft:"auto",
  },
});
