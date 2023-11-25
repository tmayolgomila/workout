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

      // Limpiar los estados de edición
      setEditingIndex(null);
      setEditedTitle('');
      setEditedExercises([]);
    }
  };

  const handleCancelEdit = () => {
    // Limpiar los estados de edición
    setEditingIndex(null);
    setEditedTitle('');
    setEditedExercises([]);
  };

  const handleEditExercise = (exerciseIndex) => {
    // Toggle the edit mode for the selected exercise
    const updatedExercises = [...editedExercises];
    updatedExercises[exerciseIndex].editMode = !updatedExercises[exerciseIndex].editMode;
    setEditedExercises(updatedExercises);
  };

  const handleInputChange = (e, exerciseIndex, fieldName) => {
    // Update the value of the edited exercise
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

  return (
    <div>
      <h1>My Workouts 💪</h1>
      {trainings.map((training, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <div>
              {/* Edited Title */}
              <label>
                Edited Title:
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </label>
              <br />

              <table>
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Weight (lbs)</th>
                    <th>Repetitions</th>
                    <th>Sets</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {editedExercises.map((exercise, exerciseIndex) => (
                    <tr key={exerciseIndex}>
                      <td>
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
                      <td>
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
                      <td>
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
                      <td>
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
              <button onClick={handleCancelEdit}>Cancel Edit</button>
            </div>
          ) : (
            <div>
              <h3>{training.title}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Weight (lbs)</th>
                    <th>Repetitions</th>
                    <th>Sets</th>
                  </tr>
                </thead>
                <tbody>
                  {training.exercises.map((exercise, exerciseIndex) => (
                    <tr key={exerciseIndex} onDoubleClick={() => handleEditExercise(exerciseIndex)}>
                      <td>{exercise.exercise}</td>
                      <td>{exercise.weight} lbs</td>
                      <td>{exercise.repetitions}</td>
                      <td>{exercise.sets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Edit and Select Training Buttons */}
              <button onClick={() => handleEdit(index)}>Edit</button>
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
