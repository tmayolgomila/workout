import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/addTraining.css";
import predefinedTrainings from '../trainings/defaultTrainings'
import { Toaster, toast } from 'sonner'
import { useTranslation } from "react-i18next";


export default function AddTraining() {
  const [trainingTitle, setTrainingTitle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");
  const { t } = useTranslation();

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
    toast.success(t('newTrainingAdd'))
    setTrainingTitle("");
    setExercises([]);

  };

  const handleAddPredefinedTraining = (predefinedTraining) => {
    setTrainingTitle(predefinedTraining.title);
    setExercises(predefinedTraining.exercises);
  };

  return (
    <div className="addTrainingContainer">
      <h1>{ t('addTrainingIcon') } </h1>

      <label>
        {t('trainingTitle')}
        <input
          className="inputAddTraining"
          type="text"
          value={trainingTitle}
          onChange={(e) => setTrainingTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
      {t('exercise')}
        <input
          className="inputAddTraining"
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
      </label>
      <br />
      <label>
       {t('weight')}
        <input
          className="inputAddTraining"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </label>
      <br />
      <label>
        {t('repetitions')}
        <input
          className="inputAddTraining"
          type="number"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
        />
      </label>
      <br />
      <label>
        {t('sets')}
        <input
          className="inputAddTraining"
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
      </label>
      <br />
      <button className="buttonForm" onClick={handleAddExercise}>
        {t('addExercise')}
      </button>
      <br />
      <br />
      <Toaster richColors  />
      <button className="buttonForm" onClick={handleAddTraining}>
       {t('addTraining')}
      </button>
      <br />
      <br />
      <section>
        <table className="exercisesTable">
          <thead>
            <tr>
              <th>{t('exercise')}</th>
              <th>{t('weight')}</th>
              <th>Reps</th>
              <th>{t('sets')}</th>
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
        <h2> {t('choosePredefined')} </h2>
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
      <Link to="/workouts" className="workoutsLink"> {t('viewWorkouts')} </Link>
    </div>

  );
}
