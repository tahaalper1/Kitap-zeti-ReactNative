import React, { useState, useEffect, useCallback  } from 'react';
import { ScrollView,RefreshControl  } from 'react-native';

//component import
import Card from '../components/Card/Card';


const BookList = ({ email, password, navigation, searchText }) => {
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  const handleDelete = (id) => {
    console.log('Deleting book with id:', id); // Log ekledik
    console.log('Email:', email); // Email'i log ile yazdır
    console.log('Password:', password); // Password'u log ile yazdır
    fetch('http://192.168.1.108/myBook/delete.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          id: id,
        }),
      })
        .then(response => {
          if (response.ok) {
            // Silme işlemi başarılı olduğunda gerekli geri bildirim
            console.log('Kart başarıyla silindi');
          } else {
            console.error('Silme işlemi başarısız');
          }
        })
        .catch(error => {
          console.error('Bir hata oluştu:', error);
        });
   
  };

  
 
   // Sayfa yenileme fonksiyonu
   const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBooks(); // Kitap verilerini yeniden al
  }, [email, password, searchText]);

  // Kitap verilerini alma fonksiyonu
  const fetchBooks = () => {
    fetch('http://192.168.1.108/myBook/bookData.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), 
    })
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error))
      .finally(() => setRefreshing(false)); // Yenileme işlemini bitir
  };

  useEffect(() => {
    // Sayfa yüklendiğinde kitap verilerini al
    fetchBooks();
  }, [fetchBooks]); // fetchBooks fonksiyonu değiştiğinde yeniden çağır

  const filteredBooks = searchText
  ? books.filter(book => book.book_name.toLowerCase().includes(searchText.toLowerCase()))
  : books;
  
  return (
    <ScrollView
    refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
    {filteredBooks.map((book) => (
        <Card
          key={book.id}
          backgroundColor="white"
          image={{ uri: book.image_url }}
          title={book.book_name}
          onPress={() => navigation.navigate('BookDetails', { book: book })}
          onDelete={() => handleDelete(book.id)}
        />
      ))}
    </ScrollView>
  );
};

export default BookList;
