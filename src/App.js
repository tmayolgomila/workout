
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AddTraining from './components/addTraining';
import WorkOuts from './components/workOuts';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/addtraining" element={<AddTraining />} />
        <Route path="/workouts" element={<WorkOuts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
