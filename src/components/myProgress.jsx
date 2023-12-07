import React, { useState, useEffect } from 'react';
import '../styles/myProgress.css';
import BarChart from '../components/barChart';
import { useTranslation } from 'react-i18next';

const MyProgress = () => {

  const { t } = useTranslation(); 

  const [oldWorkout, setOldWorkout] = useState({});

  useEffect(() => {

    const storedOldWorkout = JSON.parse(localStorage.getItem('oldWorkout')) || {};
    setOldWorkout(storedOldWorkout);
  }, []);
  

  const calculateMetric = (exercise) => {
    if (exercise.weight > 0) {
      return exercise.weight * exercise.repetitions * exercise.sets;
    } else {
      return exercise.repetitions * exercise.sets;
    }
  };

  const organizeByExercise = (exercises) => {
    const uniqueExercises = [...new Set(exercises.map((exercise) => exercise.exercise || 'Ejercicio Sin Especificar'))];
    const organizedByExercise = {};
  
    uniqueExercises.forEach((exerciseName) => {
      organizedByExercise[exerciseName] = exercises.filter(
        (exercise) => (exercise.exercise || 'Ejercicio Sin Especificar') === exerciseName
      );
    });
  
    return organizedByExercise;
  };
  
  const saveMetricToLocalStorage = (trainingName, exerciseName, metric) => {
    const storedMetrics = JSON.parse(localStorage.getItem('exerciseMetrics')) || {};

    if (!storedMetrics[trainingName]) {
      storedMetrics[trainingName] = {};
    }

    if (!storedMetrics[trainingName][exerciseName]) {
      storedMetrics[trainingName][exerciseName] = [];
    }

    const existingMetricIndex = storedMetrics[trainingName][exerciseName].findIndex(
      (storedMetric) => storedMetric === metric
    );

    if (existingMetricIndex === -1) {
      storedMetrics[trainingName][exerciseName].push(metric);
      localStorage.setItem('exerciseMetrics', JSON.stringify(storedMetrics));
    }
  };

  return (
    <div className='myProgressContainer'>
     <h2>{t('myProgress')}</h2>
      {Object.entries(oldWorkout).map(([trainingName, exercises], index) => (
        <div key={index}>
          <h3>{trainingName}</h3>
          <BarChart
            trainingName={trainingName}
            exerciseData={exercises.map((exercise) => ({
              exerciseName: exercise.exercise || 'Ejercicio Sin Especificar',
              metric: calculateMetric(exercise),
            }))}
          />
        </div>
      ))}
    </div>
  );
};

export default MyProgress;
