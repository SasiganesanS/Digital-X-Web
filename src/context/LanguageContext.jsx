import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Read saved language preference or default to English ("en")
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pdx_language");
      if (saved === "de" || saved === "en") {
        return saved;
      }
    }
    return "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
      const targetCookie = language === "de" ? "/en/de" : "/en/en";
      document.cookie = `googtrans=${targetCookie}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=${targetCookie}; path=/`;
    }
  }, [language]);

  const setLanguage = (lang) => {
    if (lang === "en" || lang === "de") {
      setLanguageState(lang);
      if (typeof window !== "undefined") {
        localStorage.setItem("pdx_language", lang);
        document.documentElement.lang = lang;

        const targetCookie = lang === "de" ? "/en/de" : "/en/en";
        document.cookie = `googtrans=${targetCookie}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=${targetCookie}; path=/`;

        const selectElem = document.querySelector(".goog-te-combo");
        if (selectElem) {
          selectElem.value = lang;
          selectElem.dispatchEvent(new Event("change"));
        } else {
          window.location.reload();
        }
      }
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "de" : "en";
    setLanguage(nextLang);
  };

  /**
   * Translate function
   * @param {string} key - Dictionary translation key
   * @param {string} [fallback] - Optional fallback text if key is not found
   */
  const t = (key, fallback = "") => {
    const dict = translations[language] || translations.en;
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    // Fallback to English dictionary if key missing in current dict
    if (translations.en && translations.en[key] !== undefined) {
      return translations.en[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
