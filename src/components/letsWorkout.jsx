import React, { useState, useEffect } from 'react';

export default function LetsWorkout() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [allExercisesCompleted, setAllExercisesCompleted] = useState(false);

  useEffect(() => {
    const selectedTrainingIndex = localStorage.getItem('selectedTrainingIndex');

    if (selectedTrainingIndex !== null) {
      const index = parseInt(selectedTrainingIndex, 10);
      const trainings = JSON.parse(localStorage.getItem('trainings')) || [];

      setSelectedTraining(trainings[index]);
    }

    const storedProgress = localStorage.getItem('workoutProgress');
    const initialProgress = storedProgress ? JSON.parse(storedProgress) : [];
    setSelectedExercises(initialProgress);
  }, []);

  useEffect(() => {
    const areAllExercisesCompleted = selectedTraining &&
      selectedTraining.exercises.every((exercise) => selectedExercises.includes(exercise));

    setAllExercisesCompleted(areAllExercisesCompleted);
  }, [selectedExercises, selectedTraining]);

  const handleCheckboxChange = (exercise) => {
    setSelectedExercises((prevSelectedExercises) => {
      if (prevSelectedExercises.includes(exercise)) {
        return prevSelectedExercises.filter((selectedExercise) => selectedExercise !== exercise);
      } else {
        return [...prevSelectedExercises, exercise];
      }
    });
  };

  const handleFinishTraining = () => {
    // Elimina el entrenamiento de la página LetsWorkout
    setSelectedTraining(null);
    setSelectedExercises([]);


  };

  if (!selectedTraining) {
    return <div>Ve a Workouts para elegir otro entrenamiento.</div>;
  }

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
      {allExercisesCompleted && (
        <div>
          <button onClick={handleFinishTraining}>Finalizar Entrenamiento</button>
          <p>Ve a Workouts para elegir otro entrenamiento.</p>
        </div>
      )}
    </div>
  );
}
