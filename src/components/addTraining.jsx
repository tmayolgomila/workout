import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddTraining() {
  const [trainingTitle, setTrainingTitle] = useState('');
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [sets, setSets] = useState('');

  const handleAddExercise = () => {
    const newExercise = { exercise, weight, repetitions, sets };
    setExercises([...exercises, newExercise]);

    setExercise('');
    setWeight('');
    setRepetitions('');
    setSets('');
  };

  const handleAddTraining = () => {
    const existingTrainings = JSON.parse(localStorage.getItem('trainings')) || [];
    const newTraining = { title: trainingTitle, exercises };
    const updatedTrainings = [...existingTrainings, newTraining];

    localStorage.setItem('trainings', JSON.stringify(updatedTrainings));

    setTrainingTitle('');
    setExercises([]);
  };

  return (
    <div>
      <h1>Add Training</h1>
      <label>
        Training Title:
        <input type="text" value={trainingTitle} onChange={(e) => setTrainingTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Exercise:
        <input type="text" value={exercise} onChange={(e) => setExercise(e.target.value)} />
      </label>
      <br />
      <label>
        Weight (lbs):
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </label>
      <br />
      <label>
        Repetitions:
        <input type="number" value={repetitions} onChange={(e) => setRepetitions(e.target.value)} />
      </label>
      <br />
      <label>
        Sets:
        <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
      </label>
      <br />
      <button onClick={handleAddExercise}>Add Exercise</button>
      <br />
      <br />
      <button onClick={handleAddTraining}>Add Training</button>
      <br />
      <br />
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            <strong>Exercise:</strong> {exercise.exercise},{' '}
            <strong>Weight:</strong> {exercise.weight} lbs,{' '}
            <strong>Repetitions:</strong> {exercise.repetitions},{' '}
            <strong>Sets:</strong> {exercise.sets}
          </li>
        ))}
      </ul>
      <br />
      <Link href="/posts/trainings"><a>View Trainings</a></Link>
    </div>
  );
}
