import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//stil import
import styles from './Input_styles';

//context import
import { useTheme } from '../../Utils/ThemeProvider';

const Input = ({ width, height, placeholder, onChangeText }) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { theme } = useTheme();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.inputContainer, { width }]}>
      <TextInput
        style={[styles.input, { height }, { color: theme === 'light' ? 'black' : 'white' }]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible && placeholder.includes('Şifre')} // Şifre alanı ise ve şifre görünür değilse secureTextEntry'yi aktifleştir
      />
      {placeholder.includes('Şifre') && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <MaterialCommunityIcons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={20}
            color={theme === 'light' ? 'black' : 'white'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
