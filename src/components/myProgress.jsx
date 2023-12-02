import React, { useState, useEffect } from 'react';
import '../styles/myProgress.css'

const MyProgress = () => {
  const [oldWorkout, setOldWorkout] = useState({});

  useEffect(() => {
    const storedOldWorkout = JSON.parse(localStorage.getItem('oldWorkout')) || {};
    setOldWorkout(storedOldWorkout);
  }, []);

  const calculateMetric = (exercise) => {
    if (exercise.weight > 0) {
      // Si hay peso especificado, calcular la Carga Total Levantada
      return exercise.weight * exercise.repetitions * exercise.sets;
    } else {
      // Si no hay peso o es 0, calcular el Volumen de Entrenamiento (Reps x Sets)
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

const saveMetricToLocalStorage = (exerciseName, metric) => {
  const storedMetrics = JSON.parse(localStorage.getItem('exerciseMetrics')) || {};
  if (!storedMetrics[exerciseName]) {
    storedMetrics[exerciseName] = [];
  }

  // Verificar si la métrica ya existe para este ejercicio antes de agregarla
  const existingMetricIndex = storedMetrics[exerciseName].findIndex((storedMetric) => storedMetric === metric);
  if (existingMetricIndex === -1) {
    storedMetrics[exerciseName].push(metric);
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
                  saveMetricToLocalStorage(exerciseName, metric); // Guardar la métrica en el localStorage
                  return (
                    <li key={innerExerciseIndex}>
                      Weight: {exercise.weight}, Reps: {exercise.repetitions}, Sets: {exercise.sets}
                      <br />
                      Metric: <strong>{metric}</strong> {/* Muestra la métrica calculada */}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyProgress;
