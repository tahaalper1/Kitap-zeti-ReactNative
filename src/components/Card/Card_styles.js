import { StyleSheet } from "react-native";

export default Card_styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardContainer: {
    width: '48%', // Kartların genişliği, biraz boşluk kalsın diye %48 olarak ayarlandı
    marginBottom: 10, // Kartlar arasındaki boşluk
  },
  card: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '100%', // Kartların maksimum genişliği
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: '50%',
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  optionsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title:{
    fontWeight:"600",
    fontSize:16,
  }
});