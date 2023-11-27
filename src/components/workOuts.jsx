import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/workOuts.css';

export default function WorkOuts() {
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedExercises, setEditedExercises] = useState([]);

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
    } else {
      // Handle cancel deletion
    }
  };

  return (
    <div className='workoutsContainer'>
      <h1>My Workouts 💪</h1>
      {trainings.map((training, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <div>
              <label>
                Edit Title:
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
                    <th>Exercise</th>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th>Sets</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='buttonSection'>

                <button className='workoutButton' onClick={handleSaveEdit}>Save Edit</button>
                <button className='workoutButton' onClick={handleCancelEdit}>Cancel</button>
                <button className='workoutButton delete' onClick={() => handleDeleteTraining(index)}>Delete Training</button>
                
              </div>
            </div>
          ) : (
            <div>
              <h3>{training.title}</h3>
              <table className="exercisesTable">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th>Sets</th>
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

                <button className='workoutButton' onClick={() => handleEdit(index)}>Edit</button>
                <button className='workoutButton' onClick={() => handleSelectTraining(index)}>Select</button>
                <button className='workoutButton delete' onClick={() => handleDeleteTraining(index)}>Delete</button>
                
              </div>
            </div>
          )}
        </div>
      ))}
      <br />
      <Link to="/addtraining" className='workoutsLink'>ADD Trainings</Link>
    </div>
  );
}
