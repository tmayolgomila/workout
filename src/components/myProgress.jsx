// En el componente MyProgress
import React, { useState, useEffect } from 'react';

const MyProgress = () => {
  const [oldWorkout, setOldWorkout] = useState({});

  useEffect(() => {
    const storedOldWorkout = JSON.parse(localStorage.getItem('oldWorkout')) || {};
    setOldWorkout(storedOldWorkout);
  }, []);

  return (
    <div>
      <h2>My Progress</h2>
      {Object.entries(oldWorkout).map(([trainingName, exercises], index) => (
        <div key={index}>
          <h3>{trainingName}</h3>
          <ul>
            {exercises.map((exercise, exerciseIndex) => (
              <li key={exerciseIndex}>
                {exercise.exercise} - Weight: {exercise.weight}, Reps: {exercise.repetitions}, Sets: {exercise.sets}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyProgress;
