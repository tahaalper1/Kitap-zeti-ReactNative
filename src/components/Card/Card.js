import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

//stil import
import styles from './Card_styles';

//context import
import { useTheme } from '../../Utils/ThemeProvider';

const Card = ({ backgroundColor, image, title, onPress, onDelete }) => {

  const { theme } = useTheme();
   
  return (
    <View>
        <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
    <View style={styles.cardContent}>
      <Image source={image} style={styles.cardImage} resizeMode="cover" />
      <Text style={[styles.title, { color: theme === 'light' ? 'black' : 'white' }]}>{title}</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={onDelete} style={styles.optionsButton}>
      <Text style={[{ color: theme === 'light' ? 'black' : 'white' }]}>
        <MaterialIcons name="delete" size={20} />
      </Text>
    </TouchableOpacity>
    </View>
    
  );
};

export default Card;
