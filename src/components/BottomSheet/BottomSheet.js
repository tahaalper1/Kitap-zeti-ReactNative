import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, Animated, PanResponder, TouchableOpacity, Image, Alert } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

//context import
import { useTheme } from '../../Utils/ThemeProvider';
import { useLanguage } from '../../Utils/LanguageProvider';

//stil dosyası import
import styles from './BottomSheet_styles'; // Stil dosyasını içe aktarın

//Component import
import Button from '../Buttton/Button';
import Input from '../Input/Input';

//responsive tasarım için ekran ölçüleri
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyBottomSheet = ({ isVisible, onClose, email, password }) => {

  const [imageRef, setImageRef] = useState(""); 
  const [bookName, setBookName] = useState('');
  const [summary, setSummary] = useState('');
  const translateY = useRef(new Animated.Value(windowHeight)).current;

  const { language, texts } = useLanguage();

  const { theme } = useTheme();

  useEffect(() => {
    
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: windowHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);


  //galeriden resim seçme ve expo file kaydı
  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('permissionResult:', permissionResult);
  
    if (permissionResult.granted === false) {
        Alert.alert('Galeri erişim izni reddedildi. Lütfen ayarlardan izinleri kontrol edin.');
        return;
    }
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log('pickerResult:', pickerResult);
  
    if (pickerResult.canceled === true) {
        return;
    }

    // pickerResult.assets dizisinden URI'yi alın
    const selectedImage = pickerResult.assets[0];
    
    // URI'nin boş veya tanımsız olup olmadığını kontrol edin
    if (!selectedImage || !selectedImage.uri) {
        console.error('Resim URI boş veya tanımsız.');
        Alert.alert('Resim seçilirken bir hata oluştu.');
        return;
    }
  
    const localUri = selectedImage.uri;

    try {
        // Dosya sistemi modülünü kullanarak dosyanın yerel yolunu alın
        const fileUri = await FileSystem.getContentUriAsync(localUri);
        console.log('fileUri:', fileUri);
        setImageRef(fileUri);
    } catch (error) {
        console.error('Resim yolunu alırken bir hata oluştu:', error);
        Alert.alert('Resim seçilirken bir hata oluştu.');
    }
};


  
  
  // Kitap kaydetme fonksiyonu
  const handleSave = () => {
    const url = 'http://192.168.1.108/myBook/bookAdd.php';
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        bookName: bookName,
        summary: summary,
        imageURL: imageRef, 
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data === "Success") {
        Alert.alert("Kitap başarıyla kaydedildi.");
        setBookName("");
        setSummary("");
        onClose();
      } else {
        Alert.alert("Kitap kaydedilirken bir hata oluştu.");
        console.error('Kitap kaydedilirken bir hata oluştu.');
      }
    })
    .catch(error => {
      console.error('Kitap kaydetme hatası:', error);
      Alert.alert("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
    });
  };

  const closeBottomSheet = () => {
    setBookName("");
    setSummary("");
    onClose();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: translateY }], { useNativeDriver: false }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else if (gestureState.dy > windowHeight * 0.5) {
          onClose();
        } else {
          Animated.timing(translateY, {
            toValue: windowHeight,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    console.log('Bottom sheet görünürlüğü değişti:', isVisible);
  }, [isVisible]);

  return (
    <BottomSheet isVisible={isVisible} modalProps={{}} style={[{ backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.container, { transform: [{ translateY: translateY }] },  { backgroundColor: theme === 'light' ? 'white' : 'black' }]}
      >
        <View style={[styles.innerContainer]}>
          <TouchableOpacity style={styles.imageButton} onPress={handleImageUpload}>
            {imageRef ? ( // imageRef dolu ise
              <Image source={{ uri: imageRef }} style={styles.image} />
            ) : (
              <MaterialIcons name="add-a-photo" size={48} color="black" />
            )}
          </TouchableOpacity>
          <Input
            width={windowWidth - 40}
            height={40}
            placeholder={texts[language].BookName}
            value={bookName}
            onChangeText={setBookName}
          />
          <Input
            width={windowWidth - 40}
            height={150}
            placeholder={texts[language].Summary}
            value={summary}
            onChangeText={setSummary}
          />
          <Button color="#007AFF" width={windowWidth - 40} height={40} text={texts[language].Save} onPress={handleSave} />
          <Button color="#dc143c" width={windowWidth - 40} height={40} text={texts[language].Giveup} onPress={closeBottomSheet} />
        </View>
      </Animated.View>
    </BottomSheet>
  );
};

export default MyBottomSheet;
