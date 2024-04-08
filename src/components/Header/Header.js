import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

 // Stil dosyasını içe aktarın
import styles from './Header_style';

//context import
import { useTheme } from '../../Utils/ThemeProvider';
import { useLanguage } from '../../Utils/LanguageProvider';

const Header = ({ onSearch, navigation, email, password }) => {
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();
  const { language, texts } = useLanguage();

  // Her harf girişinde filtreleme işlemini tetikle
  const handleSearch = (text) => {
    setSearchText(text); // Arama metnini güncelle
    onSearch(text); // Ana bileşene arama metnini iletmek için onSearch fonksiyonunu çağır
  };

  // Ayarlar sayfasını açma fonksiyonu
  const openSettingsPage = () => {
    navigation.navigate('Settings', { email: email, password: password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kitap Özeti</Text>
      <TextInput
       style={[styles.searchInput, { color: theme === 'light' ? 'black' : 'white' }]}
        placeholder={texts[language].Search}
        placeholderTextColor={{ color: theme === 'light' ? 'black' : 'white' }}
        value={searchText}
        onChangeText={handleSearch} // Her harf girişinde handleSearch fonksiyonunu çağır
      />
      <TouchableOpacity onPress={openSettingsPage}>
        <MaterialIcons
          name="settings"
          size={24}
          color="#007AFF"
          style={styles.settingsButton}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
