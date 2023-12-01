import React, { useState, useEffect } from 'react';
import '../styles/letsWorkout.css'
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
import { useTranslation } from 'react-i18next';

export default function LetsWorkout() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [allExercisesCompleted, setAllExercisesCompleted] = useState(false);
  const { t } = useTranslation();

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

    localStorage.setItem('workoutProgress', JSON.stringify(selectedExercises));
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

    if (selectedExercises.length > 0 && selectedTraining) {
 
      const oldWorkout = JSON.parse(localStorage.getItem('oldWorkout')) || {};
  
  
      oldWorkout[selectedTraining.title] = selectedExercises;
  
     
      localStorage.setItem('oldWorkout', JSON.stringify(oldWorkout));
    }

    setSelectedTraining(null);
    //setSelectedExercises([]);
  };

  if (!selectedTraining) {
    return (
      <div className='letsWorkoutContainer'>
        {t('goToChoose')}
        <br />
        <br />
        <Link to="/workouts" className='workoutsLink'> {t('myWorkouts')} </Link>
    
      </div>
    )
  }

  return (
    <div className='letsWorkoutContainer'>
      <h3>{t('workoutTracking')}</h3>
      <h4>{selectedTraining.title}</h4>
      <hr />
      <form>
  <table className="exercisesTable">
    <thead>
      <tr>
        <th></th>
        <th>{t('exercise')}</th>
        <th>{t('simpleWeight')}</th>
        <th>Reps</th>
        <th>{t('sets')}</th>
      </tr>
    </thead>
    <tbody>
      {selectedTraining.exercises.map((exercise, index) => (
        <tr key={index}>
          <td>
          <Toaster />
            <input
              className='checkBoxLetsWorkout'
              type="checkbox"
              checked={selectedExercises.includes(exercise)}
              onChange={() => handleCheckboxChange(exercise)}
              onClick={() => toast(t('exerciseCompleted'))}
            />
          </td>
          <td>
            <span className='spanLetsWorkout'>
              <strong>{exercise.exercise}</strong>
            </span>
          </td>
          <td>
            {exercise.weight > 0 && (
              <span className='spanLetsWorkout'>
                {exercise.weight} 
              </span>
            )}
          </td>
          <td>
            <span className='spanLetsWorkout'>
              {exercise.repetitions}
            </span>
          </td>
          <td>
            <span className='spanLetsWorkout'>
              {exercise.sets}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</form>

      {allExercisesCompleted && (
        <div>

          <button className="buttonForm endTrainingButton" onClick={handleFinishTraining}> {t('endTraining')} </button>
          
        </div>
      )}
    </div>
  );
}
