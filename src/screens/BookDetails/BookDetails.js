import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';

 // Stil dosyasını içe aktar
import styles from './BookDetails_styles';

//context import
import { useTheme } from '../../Utils/ThemeProvider';

const BookDetails = ({ route }) => {
    const book = route.params.book;
    const { theme } = useTheme();

  // Eğer book parametresi tanımlı değilse veya image_url özelliği yoksa, boş bir görünüm döndür
  if (!book || !book.image_url) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Kitap detayları alınamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container, { backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
        <Image
          source={{ uri: book.image_url }}
          style={styles.image}
          resizeMode='cover'
        />
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: theme === 'light' ? 'black' : 'white' }]}>{book.book_name}</Text>
          <Text style={[styles.summary, { color: theme === 'light' ? 'black' : 'white' }]}>{book.book_summary}</Text>
        </View>
      </View>
    </View>
  );
};

export default BookDetails;
