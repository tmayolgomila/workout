import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  const handleEditExercise = (exerciseIndex) => {
    const updatedExercises = [...editedExercises];
    updatedExercises[exerciseIndex].editMode = !updatedExercises[exerciseIndex].editMode;
    setEditedExercises(updatedExercises);
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
    const updatedTrainings = [...trainings];
    updatedTrainings.splice(index, 1);
    setTrainings(updatedTrainings);
    
    localStorage.setItem('trainings', JSON.stringify(updatedTrainings));
  
    setEditingIndex(null);
    setEditedTitle('');
    setEditedExercises([]);
  }

  return (
    <div>
      <h1>My Workouts 💪</h1>
      {trainings.map((training, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <div>

              <label>
                Edit Title:
                <input
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {editedExercises.map((exercise, exerciseIndex) => (
                    <tr key={exerciseIndex} className="exerciseslist" >
                      <td className="exerciseTitle">
                        {exercise.editMode ? (
                          <input
                            type="text"
                            value={exercise.exercise}
                            onChange={(e) => handleInputChange(e, exerciseIndex, 'exercise')}
                          />
                        ) : (
                          exercise.exercise
                        )}
                      </td>
                      <td className="numeral">
                        {exercise.editMode ? (
                          <input
                            type="number"
                            value={exercise.weight}
                            onChange={(e) => handleInputChange(e, exerciseIndex, 'weight')}
                          />
                        ) : (
                          exercise.weight
                        )}
                      </td>
                      <td className="numeral">
                        {exercise.editMode ? (
                          <input
                            type="number"
                            value={exercise.repetitions}
                            onChange={(e) => handleInputChange(e, exerciseIndex, 'repetitions')}
                          />
                        ) : (
                          exercise.repetitions
                        )}
                      </td>
                      <td className="numeral">
                        {exercise.editMode ? (
                          <input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => handleInputChange(e, exerciseIndex, 'sets')}
                          />
                        ) : (
                          exercise.sets
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleEditExercise(exerciseIndex)}>
                          {exercise.editMode ? 'Save' : 'Edit'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button onClick={handleSaveEdit}>Save Edit</button>
              <button onClick={() => handleDeleteTraining(index)}>Delete Training</button>
              <button onClick={handleCancelEdit}>Cancel Edit</button>
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
                    <tr key={exerciseIndex} onDoubleClick={() => handleEditExercise(exerciseIndex)} className="exerciseslist" >
                      <td className="exerciseTitle">{exercise.exercise}</td>
                      <td className="numeral">{exercise.weight}</td>
                      <td className="numeral">{exercise.repetitions}</td>
                      <td className="numeral">{exercise.sets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDeleteTraining(index)}>Delete Training</button>
              <button onClick={() => handleSelectTraining(index)}>Select Training</button>
            </div>
          )}
        </div>
      ))}
      <br />
      <Link to="/addtraining">ADD Trainings</Link>
    </div>
  );
}
