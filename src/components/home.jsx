import { Link } from "react-router-dom"

export default function Home(){

    return(<>

            <Link to="/addtraining" >ADD</Link>
                <br />
            <Link to="/workouts" >WORKS</Link>

        </>)
}