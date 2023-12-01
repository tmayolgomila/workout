// LanguageSelector.jsx
import React from 'react';
import i18n from '../i18n';
import '../styles/languageSelector.css'

const LanguageSelector = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
        
      localStorage.setItem('language', lng);
    });
  };

  return (
    <div className='langSelectContainer'>
      <button className='buttonForm langSelector' id='buttonEnglish' onClick={() => changeLanguage('en')}>English</button>
      <button className='buttonForm langSelector' id='buttonSpanish' onClick={() => changeLanguage('es')}>Español</button>
    </div>
  );
};

export default LanguageSelector;
