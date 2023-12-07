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
      goToChoose:'Go to Workouts to choose another workout, or go to ',
      myProgress:'My Progress',
      homeDescription: "Welcome to MW, your workout companion! Let us explain how it works: You can create your own workout programs or start with pre-established ones if you're a beginner. Then, you can track your progress on a weekly basis. Want to make changes? No worries, you can customize your workouts in the 'My Workouts' section. Then, get to work and complete your sessions in the 'Train' section. See how you're progressing in each exercise! Our 'My Progress' section displays metrics that will help you constantly improve and maintain a balance in your routines. We're working hard to make these metrics even better. Now, here's an important tip: to keep everything organized, it's best not to change the names of your workouts or exercises once you've created them. If you need to make adjustments, simply delete what you don't need and create something new. Additionally, if an exercise is part of more than one workout, give it a different number or a different name. This will ensure everything works seamlessly. Now, let's talk about how those metrics are constructed so you can understand them better: Each metric is calculated taking into account the weight, repetitions, and sets of an exercise. If the weight is greater than zero, we multiply the weight by the number of repetitions and sets. If the weight is zero or not specified, we simply multiply the number of repetitions by the number of sets. This provides us with a measure of your effort and progress in each exercise. Enjoy your exciting workout journey with MW!"

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
      homeDescription: "¡Bienvenido a MW, tu compañero de entrenamiento! Permítenos explicarte cómo funciona: Puedes crear tus propios programas de entrenamiento o comenzar con los preestablecidos si eres principiante. Luego, podrás darles seguimiento semanalmente. ¿Te gustaría hacer cambios? No te preocupes, puedes personalizar tus entrenamientos en la sección 'Mis Entrenos'. Después, manos a la obra y realiza tus sesiones en la sección 'Entrenar'. ¡Observa cómo avanzas en cada ejercicio! Nuestra sección 'Mi Progreso' muestra métricas que te ayudarán a mejorar constantemente y a mantener un equilibrio en tus rutinas. Estamos trabajando arduamente para hacer estas métricas aún mejores. Ahora, aquí tienes un consejo importante: para mantener todo organizado, es mejor no cambiar los nombres de tus entrenamientos o ejercicios una vez que los hayas creado. Si necesitas hacer ajustes, simplemente elimina lo que no necesites y crea algo nuevo. Además, si un ejercicio forma parte de más de un entrenamiento, dale un número o un nombre diferente. Esto garantizará un funcionamiento perfecto. Ahora, hablemos de cómo se construyen esas métricas para que las entiendas mejor: Cada métrica se calcula tomando en cuenta el peso, las repeticiones y las series de un ejercicio. Si el peso es mayor que cero, multiplicamos el peso por el número de repeticiones y series. Si el peso es cero o no está especificado, simplemente multiplicamos el número de repeticiones por el número de series. Esto nos proporciona una medida de tu esfuerzo y progreso en cada ejercicio. ¡Disfruta de tu emocionante viaje de entrenamiento con MW!"

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
