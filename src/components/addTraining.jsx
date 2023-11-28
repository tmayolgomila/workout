import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/addTraining.css";
import predefinedTrainings from '../trainings/defaultTrainings'


export default function AddTraining() {
  const [trainingTitle, setTrainingTitle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");

  const handleAddExercise = () => {
    const newExercise = { exercise, weight, repetitions, sets };
    setExercises([...exercises, newExercise]);

    setExercise("");
    setWeight("");
    setRepetitions("");
    setSets("");
  };

  const handleAddTraining = () => {
    const existingTrainings =
      JSON.parse(localStorage.getItem("trainings")) || [];
    const newTraining = { title: trainingTitle, exercises };
    const updatedTrainings = [...existingTrainings, newTraining];

    localStorage.setItem("trainings", JSON.stringify(updatedTrainings));

    setTrainingTitle("");
    setExercises([]);
  };

  const handleAddPredefinedTraining = (predefinedTraining) => {
    setTrainingTitle(predefinedTraining.title);
    setExercises(predefinedTraining.exercises);
  };

  return (
    <div className="addTrainingContainer">
      <h1>ADD TRAINING✍️</h1>

      <label>
        Training Title:
        <input
          className="inputAddTraining"
          type="text"
          value={trainingTitle}
          onChange={(e) => setTrainingTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Exercise:
        <input
          className="inputAddTraining"
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
      </label>
      <br />
      <label>
        Weight (kg):
        <input
          className="inputAddTraining"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </label>
      <br />
      <label>
        Repetitions:
        <input
          className="inputAddTraining"
          type="number"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
        />
      </label>
      <br />
      <label>
        Sets:
        <input
          className="inputAddTraining"
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
      </label>
      <br />
      <button className="buttonForm" onClick={handleAddExercise}>
        Add Exercise
      </button>
      <br />
      <br />
      <button className="buttonForm" onClick={handleAddTraining}>
        Add Training
      </button>
      <br />
      <br />
      <section>
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
            {exercises.map((exercise, index) => (
              <tr key={index} className="exercisesList">
                <td className="exerciseTitle">{exercise.exercise}</td>
                <td className="numeral">{exercise.weight}</td>
                <td className="numeral">{exercise.repetitions}</td>
                <td className="numeral">{exercise.sets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <br />
      <div className="predefinedTrainings">
        <h2>Choose a Predefined Training:</h2>
        <ul>
          {predefinedTrainings.map((predefinedTraining, index) => (
            <li className="predefinedTrainingsList" key={index}>
              <button className="buttonForm" onClick={() => handleAddPredefinedTraining(predefinedTraining)}>
                {predefinedTraining.title}
              </button>
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
      <br />
      <Link to="/workouts" className="workoutsLink">View Workouts👉</Link>
    </div>
  );
}
