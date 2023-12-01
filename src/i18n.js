// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const storedLanguage = localStorage.getItem('language'); 

const resources = {
  en: {
    translation: {
      addWorkouts: 'Add Workouts',
      myWorkouts: 'My Workouts',
      myWorkoutsIcon: 'My Workouts 💪',
      newTrainingAdd: 'New training added',
      addTrainingIcon: 'Add Training✍️',
      trainingTitle: 'Training Title:',
      exercise: 'Exercise:',
      weight: 'Weight (kg):',
      simpleWeight: 'Weight',
      repetitions: 'Repetitions:',
      sets: 'Sets:',
      addExercise: 'Add Exercise',
      addTraining: 'Add Training',
      choosePredefined: 'Choose  predefined training:',
      viewWorkouts: 'My Workouts👉',
      workoutTracking:'Workout Tracking',
      exerciseCompleted:'Exercise completed',
      endTraining:'End Training',
      editTitle:'Edit Title:',
      saveEdit:'Save Edit',
      addExercise:'Add Exercise',
      cancel:'Cancel',
      deleteTraining:'Delete Training',
      edit: 'Edit',
      select:'Select',
      delete:'Delete',
      exerciseDeleted:'Exercise deleted',
      workoutDeleted:'Workout deleted',
      goToChoose:'Go to Workouts to choose another workout.',
      myProgress:'My Progress'

    },
  },
  es: {
    translation: {
      addWorkouts: 'Añadir Entrenos',
      myWorkouts: 'Mis Entrenos',
      myWorkoutsIcon: 'Mis Entrenos 💪',
      newTrainingAdd: 'Nuevo entreno creado',
      addTrainingIcon: 'Crear Entreno✍️',
      trainingTitle: 'Título del entreno',
      exercise: 'Ejercicio',
      weight: 'Peso (kg):',
      simpleWeight: 'Peso',
      repetitions: 'Repeticiones:',
      sets: 'Series:',
      addExercise: 'Añadir Ejercicio',
      addTraining: 'Añadir Entreno',
      choosePredefined: 'Elige un entreno predeterminado:',
      viewWorkouts: 'Mis Entrenos👉',
      workoutTracking:'Registro de Ejercicios',
      exerciseCompleted:'Ejercicio completado',
      endTraining:'Finalizar Entrenamiento',
      editTitle:'Editar Título:',
      saveEdit:'Guardar Edición',
      addExercise:'Añadir Ejercicio',
      cancel:'Cancelar',
      deleteTraining:'Eliminar Entreno',
      edit: 'Editar',
      select:'Entrenar',
      delete:'Eliminar',
      exerciseDeleted:'Ejercicio eliminado',
      workoutDeleted:'Entreno eliminado',
      goToChoose:'Ve a tus entrenamientos y selecciona uno.',
      myProgress:'Mi Progreso'
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLanguage || 'en',  
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
