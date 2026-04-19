import { useState, useRef } from 'react';
import Ingredient from '../components/ingredient.jsx';

export default function ChooseIngredients({ingredients, mealType, ingredientRefs, reset, setView, setSelectedIngredients}) {
    const [showNotification, setShowNotification] = useState(false);
    const [hideNotification, setHideNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("Please select an option for each selected ingredient before submitting");
    const timeoutRef = useRef(null);
    const [selectedIngredientsLocal, setSelectedIngredientsLocal] = useState(() => {
      const initialState = {};
      ingredients.forEach(ingredient => {
        initialState[ingredient.type] = false; // Initialize all ingredients to false (not selected)
      });
      return initialState;
    });
        
    function submit(){
      let hasNull = false;
      let hasTrue = false;
      for (const value of Object.values(selectedIngredientsLocal)) {
        if (value == null) {
          hasNull = true
        }
        if (value != false){
          hasTrue = true;
        }
      }

      if (hasNull) setNotificationMessage("Please select an option for each selected ingredient before submitting");
      else if (!hasTrue) setNotificationMessage("Please select at least one ingredient");

      if (hasNull || !hasTrue){
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        setShowNotification(true);
        setHideNotification(false);
        timeoutRef.current = setTimeout(() => {
          setHideNotification(true);
          setTimeout(() => setShowNotification(false), 500); // Wait for slideUp animation to complete
        }, 2000);
        return;
      }
      setSelectedIngredients(selectedIngredientsLocal);
      reset()
    }

    const handleIngredientChange = (type, color, isRemoved) => {
      setSelectedIngredientsLocal(prevIngredients => ({
        ...prevIngredients,
        [type]: isRemoved ? false : color,
      }));
    };

    return (
      <div className="container">
        {showNotification && (
            <div className={`notification error ${hideNotification ? 'hide' : ''}`}>
            {notificationMessage}
            </div>
        )}
        <button className="back-button" onClick={(e) => {e.stopPropagation(); setView('meal');}}>&#8592; Back</button>
        <h1>What did you like today?</h1>
        <p>Rate your food by clicking the icons below</p>
        <div className="food-grid">
            {ingredients.map((ingredient, index) => {
            if ((mealType === 'A' && ingredient.type === 'Dish B') || (mealType === 'B' && ingredient.type === 'Dish A')) {
              return null;
            }
            return (
              <Ingredient
                key={index}
                name={ingredient.name}
                type={ingredient.type}
                img_link={ingredient.img_link}
                onChange={handleIngredientChange}
              />
            );
          })}
        </div>
        <button className="submit" onClick={submit}>
          Submit
        </button>
      </div>
    )
  };
