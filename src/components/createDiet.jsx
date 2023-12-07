import React, { useState, useEffect } from 'react';
import usdaData from '../usdaJSON/usda.json'; // Asegúrate de ajustar la ruta correcta

const CreateDiet = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [goal, setGoal] = useState('lose');
  const [maintenanceCalories, setMaintenanceCalories] = useState(null);
  const [weeklyMenu, setWeeklyMenu] = useState(null);

  useEffect(() => {
    // Aquí puedes trabajar con los datos de usdaData
    console.log(usdaData); // Muestra los datos en la consola para verificar
  }, []);

  const calculateCalories = () => {
    // Validar que se hayan ingresado altura, peso, edad y género
    if (!height || !weight || !age || !gender) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Convertir altura y peso a números
    const heightInCm = parseFloat(height);
    const weightInKg = parseFloat(weight);

    // Calcular las calorías de mantenimiento según el género
    let calculatedCalories = 0;

    if (gender === 'male') {
      calculatedCalories =
        88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age;
    } else if (gender === 'female') {
      calculatedCalories =
        447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * age;
    }

    // Calcular las calorías según el objetivo
    if (goal === 'lose') {
      calculatedCalories -= 500; // Restar 500 calorías para perder peso
    } else if (goal === 'gain') {
      calculatedCalories += 500; // Sumar 500 calorías para ganar peso
    }

    calculatedCalories = Math.floor(calculatedCalories);

    // Actualizar el estado de las calorías calculadas
    setMaintenanceCalories(calculatedCalories);
  };

  const generateWeeklyMenu = (maintenanceCalories) => {
    // Distribución de macronutrientes deseada
    const proteinPercentage = 0.30; // 30% de calorías de proteínas
    const carbPercentage = 0.50;    // 50% de calorías de carbohidratos
    const fatPercentage = 0.20;     // 20% de calorías de grasas

    // Calorías diarias disponibles para cada macronutriente
    const proteinCalories = Math.floor(maintenanceCalories * proteinPercentage);
    const carbCalories = Math.floor(maintenanceCalories * carbPercentage);
    const fatCalories = Math.floor(maintenanceCalories * fatPercentage);

    // Crear un menú semanal
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weeklyMenu = {};

    daysOfWeek.forEach((day) => {
      // Calorías disponibles para cada comida (desayuno, almuerzo, cena)
      const caloriesPerMeal = Math.floor(maintenanceCalories / 3);

      // Macronutrientes disponibles para cada comida
      const proteinPerMeal = Math.floor(proteinCalories / 3);
      const carbPerMeal = Math.floor(carbCalories / 3);
      const fatPerMeal = Math.floor(fatCalories / 3);

      // Menú del día (aquí puedes seleccionar alimentos de usdaData)
      const dailyMenu = {
        Breakfast: {
          Protein: `${Math.floor(proteinPerMeal / 4)}g`,
          Carbohydrates: `${Math.floor(carbPerMeal / 4)}g`,
          Fat: `${Math.floor(fatPerMeal / 4)}g`,
          // Añade aquí alimentos para el desayuno
        },
        Lunch: {
          Protein: `${Math.floor(proteinPerMeal / 2)}g`,
          Carbohydrates: `${Math.floor(carbPerMeal / 2)}g`,
          Fat: `${Math.floor(fatPerMeal / 2)}g`,
          // Añade aquí alimentos para el almuerzo
        },
        Dinner: {
          Protein: `${Math.floor(proteinPerMeal / 4)}g`,
          Carbohydrates: `${Math.floor(carbPerMeal / 4)}g`,
          Fat: `${Math.floor(fatPerMeal / 4)}g`,
          // Añade aquí alimentos para la cena
        },
      };

      weeklyMenu[day] = dailyMenu;
    });

    return weeklyMenu;
  };

  useEffect(() => {
    if (maintenanceCalories !== null) {
      const generatedMenu = generateWeeklyMenu(maintenanceCalories);
      setWeeklyMenu(generatedMenu);
    }
  }, [maintenanceCalories]);

  return (
    <div>
      <h2>Create Diet</h2>

      <div>
        <h3>Enter Personal Information</h3>
        <label>
          Height (cm):
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <br />
        <label>
          Weight (kg):
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Goal:
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </label>
        <br />
        <button onClick={calculateCalories}>Calculate Calories</button>
      </div>

      {/* Mostrar las calorías de mantenimiento */}
      {maintenanceCalories !== null && (
        <div>
          <h3>Maintenance Calories</h3>
          <p>{maintenanceCalories} calories per day</p>
        </div>
      )}

      {/* Mostrar el menú semanal */}
      {weeklyMenu && (
        <div>
          <h3>Weekly Menu</h3>
          <pre>{JSON.stringify(weeklyMenu, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreateDiet;
