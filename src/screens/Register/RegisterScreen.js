import React, { useRef } from 'react';
import { View, Dimensions, Alert } from 'react-native';

//stil import
import styles from './Register_styles';

//component import
import Input from '../../components/Input/Input';
import Button from '../../components/Buttton/Button';



const windowWidth = Dimensions.get('window').width;

const RegisterScreen = ({navigation}) => {
  const emailRef = useRef('');
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const isValidEmail = (email) => {
    // Mail adresinin uygunluğunu kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    // Giriş değerlerini al
    const email = emailRef.current.trim();
    const username = usernameRef.current.trim();
    const password = passwordRef.current;
    const confirmPassword = confirmPasswordRef.current;

    // Boş giriş kontrolü
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    // Mail adresinin uygunluğunu kontrol et
    if (!isValidEmail(email)) {
      Alert.alert('Hata', 'Geçerli bir mail adresi giriniz.');
      return;
    }

    // Şifre eşleşme kontrolü
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }

    // Verileri hazırla
    const data = {
      email: email,
      username: username,
      password: password
    };

    // API'ye veri gönder
    const url = 'http://192.168.1.108/myBook/index.php';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
      Alert.alert('Bilgi', result);
      // Kayıt işlemi başarılıysa alanları temizle
      navigation.goBack();
      emailRef.current = "";
      usernameRef.current = '';
      passwordRef.current = '';
      confirmPasswordRef.current = '';
    })
    .catch(error => {
      console.error('Hata:', error);
      Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu.');
    });
  };
  
  return (
    <View style={styles.container}>
      <Input width={windowWidth - 40} height={40} placeholder="E-mail Giriniz" onChangeText={(text) => emailRef.current = text} />
      <Input width={windowWidth - 40} height={40} placeholder="Kullanıcı Adı Giriniz" onChangeText={(text) => usernameRef.current = text} />
      <Input width={windowWidth - 40} height={40} placeholder="Şifre Giriniz" secureTextEntry={true} onChangeText={(text) => passwordRef.current = text} />
      <Input width={windowWidth - 40} height={40} placeholder="Şifrenizi Yeniden Giriniz" secureTextEntry={true} onChangeText={(text) => confirmPasswordRef.current = text} />
      <Button color="#007AFF" width={windowWidth - 40} height={40} text="Üye Ol" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
