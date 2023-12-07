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
      homeDescription: "Welcome to MW, your training companion. Let us walk you through how it works: You can create your own training programs or start with the pre-set ones if you're a beginner. Then, you can track them on a weekly basis. Want to make changes? No problem, you can customize your workouts in the 'My Workouts' section. Then, roll up your sleeves and carry out your sessions in the 'Train' section. See how you're progressing in each exercise! Our 'My Progress' section provides metrics to help you constantly improve and maintain balance in your routines. We're working hard to make these metrics even better! Here's a tip: to keep everything organized, it's best not to change the names of your workouts or exercises once created. If you need to make adjustments, simply remove what you don't need and create something new. And if an exercise is part of more than one workout, give it a number or a different name. This will ensure that everything runs smoothly. Enjoy your training journey with MW!"

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
      homeDescription: "Bienvenido a MW, tu compañero de entrenamiento. Aquí te explicamos cómo funciona: Puedes crear tus propios programas de entrenamiento o empezar con los preestablecidos si eres principiante. Luego, podrás darles seguimiento semanalmente. ¿Quieres hacer cambios? No hay problema, puedes personalizar tus entrenamientos en la sección 'Mis Entrenos'. Luego, ponte manos a la obra y realiza tus sesiones en la sección 'Entrenar'. ¡Mira cómo avanzas en cada ejercicio! Nuestra sección 'Mi Progreso' te muestra métricas que te ayudarán a mejorar constantemente y mantener un equilibrio en tus rutinas. ¡Estamos trabajando duro para que estas métricas sean aún mejores! Aquí tienes un consejo: para mantener todo en orden, es mejor no cambiar los nombres de tus entrenamientos o ejercicios una vez creados. Si necesitas hacer ajustes, simplemente elimina lo que no necesites y crea algo nuevo. Y si un ejercicio forma parte de más de un entrenamiento, dale un número o un nombre diferente. Esto asegurará que todo funcione a la perfección. ¡Disfruta de tu viaje de entrenamiento con MW!"

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
