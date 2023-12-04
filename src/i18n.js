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
      cancel:'Cancel',
      deleteTraining:'Delete Training',
      edit: 'Edit',
      select:'Select',
      delete:'Delete',
      exerciseDeleted:'Exercise deleted',
      workoutDeleted:'Workout deleted',
      goToChoose:'Go to Workouts to choose another workout.',
      myProgress:'My Progress',
      homeDescription: "The functionality of MW is described as follows: you have the option to incorporate your own training programs or use the default ones if you are just starting, with the purpose of monitoring them on a weekly basis. You can make edits in the 'My Workouts' section and complete the sessions in the 'Select' section. This allows you to visualize your progress in each exercise through the metrics in the 'My Progress' section, facilitating continuous improvement and balance in your routines.",


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
      cancel:'Cancelar',
      deleteTraining:'Eliminar Entreno',
      edit: 'Editar',
      select:'Entrenar',
      delete:'Eliminar',
      exerciseDeleted:'Ejercicio eliminado',
      workoutDeleted:'Entreno eliminado',
      goToChoose:'Ve a tus entrenamientos y selecciona uno.',
      myProgress:'Mi Progreso',
      homeDescription: "La operatividad de MW se explica de la siguiente manera: tienes la posibilidad de integrar tus propios programas de entrenamiento o utilizar los preestablecidos si estás comenzando, con el fin de darles seguimiento semanalmente. Puedes realizar modificaciones en la sección 'Mis Entrenos' y llevar a cabo las sesiones en la sección 'Entrenar'. Esto te brinda la oportunidad de observar tu progreso en cada ejercicio mediante las métricas de la sección 'Mi Progreso', facilitando la consecución de mejoras continuas y el establecimiento de un equilibrio en tus rutinas.",

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
