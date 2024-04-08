import React, { useState } from 'react';
import { View, Dimensions, Alert } from 'react-native';

//stil import
import styles from './Login_styles';

//component import
import Input from '../../components/Input/Input';
import Button from '../../components/Buttton/Button';

const windowWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  //girilen email gerçek bir email düzeninde mi?
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };


  //php api bağlantısı giriş yapma işlemi
  const handleLogin = () => {
    if (!isValidEmail(email)) {
      Alert.alert('Hata', 'Geçerli bir e-posta adresi giriniz.');
      return;
    }

    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    const url = 'http://192.168.1.108/myBook/login.php';

    const data = {
      email: email.trim(),
      password: password.trim()
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.text())
      .then(result => {
        if (result === 'Success') {
          setEmail('');
          setPassword('');
          Alert.alert('Bilgi', 'Giriş yapıldı.');
          navigation.navigate("Home", {
            email: email,
            password: password
          });
        } else {
          Alert.alert('Hata', 'E-posta veya şifre hatalı.');
        }
      })
      .catch(error => {
        console.error('Hata:', error);
        Alert.alert('Hata', 'Giriş işlemi sırasında bir hata oluştu.');
      });
  };

  return (
    <View style={styles.container}>
      <Input
        width={windowWidth - 40}
        height={40}
        placeholder="E-mail Giriniz"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        width={windowWidth - 40}
        height={40}
        placeholder="Şifre Giriniz"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button color="#007AFF" width={windowWidth - 40} height={40} text="Giriş Yap" onPress={handleLogin} />
      <Button color="#007AFF" width={windowWidth - 40} height={40} text="Üye Ol" onPress={handleRegister} />
    </View>
  );
};

export default LoginScreen;
