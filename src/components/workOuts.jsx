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

  const handleInputChange = (e, exerciseIndex) => {
    // Update the value of the edited exercise
    const { name, value } = e.target;
    const updatedExercises = [...editedExercises];
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      [name]: value,
    };
    setEditedExercises(updatedExercises);
  };

  const handleSelectTraining = (index) => {
    localStorage.setItem('selectedTrainingIndex', index);
    navigate('/letsworkout');
  };

  return (
    <div>
      <h1>List of Trainings</h1>
      {trainings.map((training, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <div>
              <label>
                Edited Title:
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </label>
              <br />
              <label>
                Edited Exercises:
                {editedExercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex}>
                    {exercise.editMode ? (
                      <div>
                        <label>
                          Exercise:
                          <input
                            type="text"
                            value={exercise.exercise}
                            onChange={(e) => handleInputChange(e, exerciseIndex)}
                          />
                        </label>
                        <label>
                          Weight (lbs):
                          <input
                            type="number"
                            value={exercise.weight}
                            onChange={(e) => handleInputChange(e, exerciseIndex)}
                          />
                        </label>
                        <label>
                          Repetitions:
                          <input
                            type="number"
                            value={exercise.repetitions}
                            onChange={(e) => handleInputChange(e, exerciseIndex)}
                          />
                        </label>
                        <label>
                          Sets:
                          <input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => handleInputChange(e, exerciseIndex)}
                          />
                        </label>
                      </div>
                    ) : (
                      <span>
                        {exercise.exercise}, {exercise.weight} lbs, {exercise.repetitions}, {exercise.sets}
                      </span>
                    )}
                    <button onClick={() => handleEditExercise(exerciseIndex)}>
                      {exercise.editMode ? 'Save' : 'Edit'}
                    </button>
                  </div>
                ))}
              </label>
              <button onClick={handleSaveEdit}>Save Edit</button>
              <button onClick={handleCancelEdit}>Cancel Edit</button>
            </div>
          ) : (
            <div>
              <h3>{training.title}</h3>
              <ul>
                {training.exercises.map((exercise, exerciseIndex) => (
                  <li key={exerciseIndex} onDoubleClick={() => handleEditExercise(exerciseIndex)}>
                    <strong>Exercise:</strong> {exercise.exercise},{' '}
                    <strong>Weight:</strong> {exercise.weight} lbs,{' '}
                    <strong>Repetitions:</strong> {exercise.repetitions},{' '}
                    <strong>Sets:</strong> {exercise.sets}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleSelectTraining(index)}>
                Select Training
              </button>
            </div>
          )}
        </div>
      ))}
      <br />
      <Link to="/addtraining">ADD Trainings</Link>
    </div>
  );
}
