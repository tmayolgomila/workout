import { Link } from "react-router-dom"
import '../styles/home.css'

export default function Home(){

    return(
        <div className="homeContainer">
      
            <Link to="/addtraining" className="buttonForm buttonHome">ADD WORKOUTS</Link>
       
            
                <br />
      
            <Link to="/workouts" className="buttonForm">MY WORKOUTS</Link>
      
        </div>
        )
}