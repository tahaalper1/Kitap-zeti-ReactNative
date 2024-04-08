import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

//stil dosyası import
import styles from "./Button_styles"

const Button = ({ color, width, height, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color, width, height }]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
