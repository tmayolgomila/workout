import React, { useState } from 'react';

export default function LetsWorkout({ selectedTraining }) {
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleCheckboxChange = (exercise) => {
    // Toggle the selected state of the exercise
    setSelectedExercises((prevSelectedExercises) => {
      if (prevSelectedExercises.includes(exercise)) {
        return prevSelectedExercises.filter((selectedExercise) => selectedExercise !== exercise);
      } else {
        return [...prevSelectedExercises, exercise];
      }
    });
  };

  return (
    <div>
      <h1>Let's Workout</h1>
      <h2>{selectedTraining.title}</h2>
      <form>
        {selectedTraining.exercises.map((exercise, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedExercises.includes(exercise)}
                onChange={() => handleCheckboxChange(exercise)}
              />
              {exercise.exercise}, {exercise.weight} lbs, {exercise.repetitions}, {exercise.sets}
            </label>
          </div>
        ))}
      </form>
      <button onClick={() => console.log('Selected Exercises:', selectedExercises)}>
        Start Workout
      </button>
    </div>
  );
}
