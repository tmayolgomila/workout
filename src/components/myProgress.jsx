import React, { useState, useEffect } from 'react';
import '../styles/myProgress.css'
import BarChart from './barChart';

const MyProgress = () => {
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
    // Organiza los ejercicios por el nombre del ejercicio
    const organizedByExercise = {};
    exercises.forEach((exercise) => {
      const exerciseName = exercise.exercise || 'Ejercicio Sin Especificar'; // Usa 'Ejercicio Sin Especificar' si no se especifica
      if (!organizedByExercise[exerciseName]) {
        organizedByExercise[exerciseName] = [];
      }
      organizedByExercise[exerciseName].push(exercise);
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
      
      <h2>My Progress</h2>
      {Object.entries(oldWorkout).map(([trainingName, exercises], index) => (
        <div key={index}>
          <h3>{trainingName}</h3>
          {Object.entries(organizeByExercise(exercises)).map(([exerciseName, exerciseExercises], exerciseIndex) => (
            <div key={exerciseIndex}>
              <h4>{exerciseName}</h4>
              <ul className='myProgressList'>
                {exerciseExercises.map((exercise, innerExerciseIndex) => {
                  const metric = calculateMetric(exercise);
                  saveMetricToLocalStorage(trainingName, exerciseName, metric);
                  return (
                    <li key={innerExerciseIndex} className='metricList'>

                      Metric: <strong>{metric}</strong>

                    </li>

                  );
                })}
              </ul>

              <BarChart exerciseMetrics={exerciseExercises.map(exercise => calculateMetric(exercise))} />

            </div>
            
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyProgress;
