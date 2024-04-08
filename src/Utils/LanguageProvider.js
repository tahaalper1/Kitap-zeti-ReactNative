import React, { createContext, useState, useContext } from 'react';

// Dil bağlamı oluşturma
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('tr'); // Varsayılan dil Türkçe

  // Metinlerin dillerine göre değiştirilmesi
  const texts = {
    tr: {
      Search: 'Arama Yap',
      Logout :"Çıkış Yap",
      Language:"Dil Seçeneği",
      Theme:"Tema Seçeneği",
      BookDetail:"Kitap Detayları",
      Settings:"Ayarlar",
      BookName:"Kitap Adı Giriniz",
      Summary:"Özet Giriniz",
      Save:"Kaydet",
      Giveup:"Vazgeç"
    },
    en: {
      Search:"Seach",
      Logout :"Logout",
      Language:"Language Option",
      Theme:"Theme Option",
      BookDetail:"Book Details",
      Settings:"Settings",
      BookName:"Enter Book Name",
      Summary:"Enter Summary",
      Save:"Save",
      Giveup:"Give Up"
    },
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
