import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/workOuts.css';
import { Toaster, toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function WorkOuts() {
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedExercises, setEditedExercises] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const existingTrainings = JSON.parse(localStorage.getItem('trainings')) || [];
    setTrainings(existingTrainings);
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedTitle(trainings[index].title);
    setEditedExercises([...trainings[index].exercises]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedTrainings = [...trainings];
      updatedTrainings[editingIndex].title = editedTitle;
      updatedTrainings[editingIndex].exercises = editedExercises;
      setTrainings(updatedTrainings);

      localStorage.setItem('trainings', JSON.stringify(updatedTrainings));

      setEditingIndex(null);
      setEditedTitle('');
      setEditedExercises([]);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedTitle('');
    setEditedExercises([]);
  };

  const handleInputChange = (e, exerciseIndex, fieldName) => {
    const { value } = e.target;
    const updatedExercises = [...editedExercises];
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      [fieldName]: value,
    };
    setEditedExercises(updatedExercises);
  };

  const handleSelectTraining = (index) => {
    localStorage.setItem('selectedTrainingIndex', index);
    navigate('/letsworkout');
  };

  const handleDeleteTraining = (index) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this training?');

    if (shouldDelete) {
      const updatedTrainings = [...trainings];
      updatedTrainings.splice(index, 1);
      setTrainings(updatedTrainings);

      localStorage.setItem('trainings', JSON.stringify(updatedTrainings));

      setEditingIndex(null);
      setEditedTitle('');
      setEditedExercises([]);
      toast.info(t('workoutDeleted'))
    } else {
      // Handle cancel deletion
    }
  };

  const handleAddExercise = () => {
    setEditedExercises([...editedExercises, { exercise: '', weight: 0, repetitions: 0, sets: 0 }]);
  };

  const handleRemoveExercise = (exerciseIndex) => {
    const updatedExercises = [...editedExercises];
    updatedExercises.splice(exerciseIndex, 1);
    setEditedExercises(updatedExercises);
    toast.info(t('exerciseDeleted'))
  };

  return (
    <div className='workoutsContainer'>
      <Toaster richColors/>
      <h1>{t('myWorkoutsIcon')}</h1>
      {trainings.map((training, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <div>
              <label>
                {t('editTitle')}
                <input
                  className='inputWorkoutTitle'
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </label>
              <br />
  
              <table className="exercisesTable">
                <thead>
                  <tr>
                    <th>{t('exercise')}</th>
                    <th>{t('simpleWeight')}</th>
                    <th>Reps</th>
                    <th>{t('sets')}</th>
                  </tr>
                </thead>
                <tbody>
                  {editedExercises.map((exercise, exerciseIndex) => (
                    <tr key={exerciseIndex} className="exerciseslist">
                      <td className="exerciseTitle">
                        <input
                          className='inputWorkout'
                          type="text"
                          value={exercise.exercise}
                          onChange={(e) => handleInputChange(e, exerciseIndex, 'exercise')}
                        />
                      </td>
                      <td className="numeral">
                        <input
                          className='inputWorkout'
                          type="number"
                          value={exercise.weight}
                          onChange={(e) => handleInputChange(e, exerciseIndex, 'weight')}
                        />
                      </td>
                      <td className="numeral">
                        <input
                          className='inputWorkout'
                          type="number"
                          value={exercise.repetitions}
                          onChange={(e) => handleInputChange(e, exerciseIndex, 'repetitions')}
                        />
                      </td>
                      <td className="numeral">
                        <input
                          className='inputWorkout'
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => handleInputChange(e, exerciseIndex, 'sets')}
                        />
                      </td>
                      <td className='deleteButtonContainer'>
                        <button className='deleteButton' onClick={() => handleRemoveExercise(exerciseIndex)}>
                        <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
  
              <div className='buttonSection'>
                <button className='workoutButton' onClick={handleSaveEdit}> {t('saveEdit')} </button>
                  <button className='workoutButton' onClick={handleAddExercise}> {t('addExercise')} </button>
                <button className='workoutButton' onClick={handleCancelEdit}> {t('cancel')} </button>
                <button className='workoutButton delete' onClick={() => handleDeleteTraining(index)}> {t('deleteTraining')} </button>
              </div>
            </div>
          ) : (
            <div>
              <h3>{training.title}</h3>
              <table className="exercisesTable">
                <thead>
                  <tr>
                    <th>{t('exercise')}</th>
                    <th>{t('simpleWeight')}</th>
                    <th>Reps</th>
                    <th>{t('sets')}</th>
                  </tr>
                </thead>
                <tbody>
                  {training.exercises.map((exercise, exerciseIndex) => (
                    <tr key={exerciseIndex} className="exerciseslist">
                      <td className="exerciseTitle">{exercise.exercise}</td>
                      <td className="numeral">{exercise.weight}</td>
                      <td className="numeral">{exercise.repetitions}</td>
                      <td className="numeral">{exercise.sets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  
              <div className='buttonSection'>
                <button className='workoutButton' onClick={() => handleEdit(index)}>{t('edit')}</button>
                <button className='workoutButton' onClick={() => handleSelectTraining(index)}>{t('select')}</button>
                <button className='workoutButton delete' onClick={() => handleDeleteTraining(index)}>{t('delete')}</button>
              </div>
            </div>
          )}
        </div>
      ))}
      <br />
      <Link to="/addtraining" className='workoutsLink'> {t('addTraining')} </Link>
    </div>
  );
  
}
