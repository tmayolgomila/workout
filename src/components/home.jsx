import { Link } from "react-router-dom"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import '../styles/home.css'
import React from "react";

export default function Home(){



    return(
        
        <div className="homeContainer">
      


            {/*
            <div className="calendarContainer">
                <Calendar />
            </div>
            */}


            <Link to="/addtraining" className="buttonForm firstButtonHome">ADD WORKOUTS</Link>
       
            
                <br />
      
            <Link to="/workouts" className="buttonForm buttonHome">MY WORKOUTS</Link>

        </div>

        )
        
}