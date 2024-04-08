import React, { useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { FAB } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

//stil import
import styles from './Home_styles'; 

//component import
import MyBottomSheet from '../../components/BottomSheet/BottomSheet';
import BookList from '../../Utils/BookList';
import Header from '../../components/Header/Header';

//context import
import { useTheme } from '../../Utils/ThemeProvider';

const HomeScreen = ({ route, navigation }) => {
  const { email, password } = route.params;
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme(); // Temayı alın

  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };


  //ekran yenileme
  const onRefresh = () => {
    setRefreshing(true);
   
    setTimeout(() => {
      setRefreshing(false);
  
    }, 2000); 
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
      <Header searchText={searchText} setSearchText={setSearchText} onSearch={handleSearch} navigation={navigation}  
       email={email} 
       password={password} 
      />
      <MyBottomSheet isVisible={isBottomSheetVisible} onClose={closeBottomSheet} email={email} password={password} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ color: theme === 'light' ? 'black' : 'white' }} // ScrollView için yazı rengini de temaya göre ayarlayın
      >
        <BookList email={email} password={password} navigation={navigation} searchText={searchText}/>
      </ScrollView>
      <FAB
        placement="right"
        color="#007AFF"
        icon={<MaterialIcons name="add" size={24} color="white" />}
        onPress={openBottomSheet}
        style={{ zIndex: 1 }}
      />
    </View>
  );
};

export default HomeScreen;
