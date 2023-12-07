import { Link } from "react-router-dom"
import '../styles/home.css'
import React from "react";
import { useTranslation } from 'react-i18next';

export default function Home(){

    const { t } = useTranslation(); 

    return(
        <div className="homeContainer">

      

            <Link to="/addtraining" className="buttonForm firstButtonHome">
            {t('addWorkouts')}
            </Link>
       
            
                <br />
      
            <Link to="/workouts" className="buttonForm buttonHome">
            {t('myWorkouts')}
            </Link>

            <Link to="/myprogress" className="buttonForm buttonHome">
            {t('myProgress')}
            </Link>

        <div className="homeDescriptionContainer" >
            <p className="homeDescription">{t('homeDescription')}</p>
           
        </div>
        


        </div>
        )
}