import React, { useState, useEffect } from 'react';
import '../styles/letsWorkout.css'
import { Link } from 'react-router-dom';

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
    setSelectedTraining(null);
    setSelectedExercises([]);


  };

  if (!selectedTraining) {
    return (
    <div className='letsWorkoutContainer'>
        Go to Workouts to choose another workout.
        <br/>
        <br/>
      <Link to="/workouts" className='workoutsLink'>Workouts</Link>
    </div>
    )
  }

  return (
    <div className='letsWorkoutContainer'>
      <h3>Workout Tracking</h3>
      <h4>{selectedTraining.title}</h4>
      <hr />
      <form>
        {selectedTraining.exercises.map((exercise, index) => (
          <div key={index}>

            <label style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginBottom: '1em' }}>
              <input 
                className='checkBoxLetsWorkout'
                type="checkbox"
                checked={selectedExercises.includes(exercise)}
                onChange={() => handleCheckboxChange(exercise)}
              />
              <span className='spanLetsWorkout'>
                <strong>{exercise.exercise}</strong> {exercise.weight} kg {exercise.repetitions} Reps {exercise.sets} Sets
              </span>
            </label>

          </div>
        ))}
      </form>
      {allExercisesCompleted && (
        <div>
          <button className="buttonForm" onClick={handleFinishTraining}>End Training</button>

        </div>
      )}
    </div>
  );
}
