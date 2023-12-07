
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AddTraining from './components/addTraining';
import WorkOuts from './components/workOuts';
import Home from './components/home';
import Navbar from './components/navbar';
import LetsWorkout from './components/letsWorkout';
import MyProgress from './components/myProgress';
import CreateDiet from './components/createDiet.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      
        <Route path='/' element={<Home/>} />
        <Route path='letsworkout' element={<LetsWorkout/>} />
        <Route path="/addtraining" element={<AddTraining />} />
        <Route path="/workouts" element={<WorkOuts />} />
        <Route path="/myprogress" element={<MyProgress />} />
        <Route path="/creatediet" element={<CreateDiet />} /> 

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
