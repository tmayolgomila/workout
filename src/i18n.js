// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const storedLanguage = localStorage.getItem('language');  // Obtener el idioma almacenado

const resources = {
  en: {
    translation: {
      addWorkouts: 'ADD WORKOUTS',
      myWorkouts: 'MY WORKOUTS',
    },
  },
  es: {
    translation: {
      addWorkouts: 'AÑADIR EJERCICIOS',
      myWorkouts: 'MIS EJERCICIOS',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLanguage || 'en',  // Usar el idioma almacenado o 'en' como predeterminado
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
