// LanguageSelector.jsx
import React from 'react';
import i18n from '../i18n';

const LanguageSelector = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
        
      localStorage.setItem('language', lng);
    });
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
    </div>
  );
};

export default LanguageSelector;
