import React from 'react';
import { View, Text, TouchableOpacity, Dimensions} from 'react-native';

//stil import
import styles from './Settings_styles';

//component import
import Button from '../../components/Buttton/Button';

//context import
import { useTheme } from '../../Utils/ThemeProvider';
import { useLanguage } from '../../Utils/LanguageProvider';

const windowWidth = Dimensions.get('window').width;

const Settings = ({navigation}) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, texts } = useLanguage(); 
  
  const toggleTheme = async () => {
    try {
      const response = await fetch('http://192.168.1.108/myBook/Theme.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: theme === 'light' ? 'dark' : 'light' }),
      });
      
      if (response.ok) {
        console.log("Tema güncellendi");
        setTheme(theme === 'light' ? 'dark' : 'light');
      } else {
        console.error('Tema güncelleme hatası:', response.status);
      }
    } catch (error) {
      console.error('Tema güncelleme hatası:', error);
    }
  };

  const toggleLanguage = async () => {
    try {
      const response = await fetch('http://192.168.1.108/myBook/Language.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: language === 'tr' ? 'en' : 'tr' }),
      });
      
      if (response.ok) {
        console.log("Dil güncellendi");
        setLanguage(language === 'tr' ? 'en' : 'tr');
      } else {
        console.error('Dil güncelleme hatası:', response.status);
      }
    } catch (error) {
      console.error('Dil güncelleme hatası:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://192.168.1.108/myBook/Logout.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Burada boş bir body gönderebiliriz, çünkü sadece oturumu sonlandırıyoruz.
        body: JSON.stringify({}),
      });
      
      if (response.ok) {
        navigation.navigate('Login');
        console.log("Çıkış başarılı");
        // Çıkış başarılı olduğunda uygun işlemleri yapabilirsiniz, örneğin kullanıcıyı giriş ekranına yönlendirebilirsiniz.
      } else {
        console.error('Çıkış hatası:', response.status);
      }
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
      <View style={styles.switchContainer}>
        <Text style={[styles.text, { flex: 1, color: theme === 'light' ? 'black' : 'white' }]}>{texts[language].Theme}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => toggleTheme()}>
            <View style={[styles.button, theme === 'light' && styles.selectedButton]}>
              <Text style={[styles.buttonText, theme === 'light' && styles.selectedButtonText, { color: theme === 'light' ? 'white' : 'white' }]}>Aydınlık Tema</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleTheme()}>
            <View style={[styles.button, theme === 'dark' && styles.selectedButton]}>
              <Text style={[styles.buttonText, theme === 'dark' && styles.selectedButtonText, { color: theme === 'dark' ? 'white' : 'black' }]}>Koyu Tema</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Text style={[styles.text, { flex: 1, color: theme === 'light' ? 'black' : 'white' }]}>{texts[language].Language}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => toggleLanguage()}>
            <View style={[styles.button, language === 'tr' && styles.selectedButton]}>
              <Text style={[styles.buttonText, language === 'tr' && styles.selectedButtonText, { color: theme === 'light' ? 'black' : 'white' }]}>Türkçe</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleLanguage()}>
            <View style={[styles.button, language === 'en' && styles.selectedButton]}>
              <Text style={[styles.buttonText, language === 'en' && styles.selectedButtonText, { color: theme === 'dark' ? 'white' : 'black' }]}>English</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Button color="#007AFF" width={windowWidth - 40} height={40} text={texts[language].Logout} onPress={() => handleLogout()} />
    </View>
  );
};

export default Settings;
