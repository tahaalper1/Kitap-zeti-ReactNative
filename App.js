import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//screen import
import LoginScreen from './src/screens/Login/LoginScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import BookDetails from './src/screens/BookDetails/BookDetails';
import Settings from './src/screens/Settings/Settings';



//context import
import { ThemeProvider, useTheme } from './src/Utils/ThemeProvider';
import { LanguageProvider, useLanguage } from './src/Utils/LanguageProvider'; 

const Stack = createStackNavigator();


const App = () => {
  const [splashVisible, setSplashVisible] = useState(true);


  useEffect(() => {
    // Splash ekranı gizlenene kadar bekle
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <>
          {splashVisible && (
            // Splash ekran içeriği buraya gelebilir
            <View style={styles.splashContainer}>
              <Image
                source={require('./assets/book.png')} // Resmin yolu
                style={styles.splashImage} // Stil
              />
            </View>
          )}
          {!splashVisible && (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen
                  name="BookDetails"
                  component={BookDetails}
                  options={() => ({
                     headerTitle: useLanguage() === "tr" ? "Kitap Detayları" : "Book Details",
                    headerTitleStyle: { color: useTheme() === 'light' ? 'black' : 'white' },
                    headerStyle: { backgroundColor: useTheme() === 'light' ? 'white' : 'black' },
                    headerTintColor: useTheme() === 'light' ? 'black' : 'white',
                  })}
                />
                <Stack.Screen
                  name="Settings"
                  component={Settings}
                  options={() => ({
                    headerTitle: useLanguage() === "tr" ? "Ayarlar" : "Settings",
                    headerTitleStyle: { color: useTheme() === 'light' ? 'black' : 'white' },
                    headerStyle: { backgroundColor: useTheme() === 'light' ? 'white' : 'black' },
                    headerTintColor: useTheme() === 'light' ? 'black' : 'white',
                  })}
                />
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </>
      </ThemeProvider>
    </LanguageProvider>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white',
  },
  splashImage: {
    width: '100%',
    height: '50%', 
  },
});

export default App;
