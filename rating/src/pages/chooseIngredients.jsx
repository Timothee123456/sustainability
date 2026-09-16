import { useState, useRef } from 'react';
import Ingredient from '../components/ingredient.jsx';
import BackButton from '../components/BackButton.jsx';

export default function ChooseIngredients({ingredients, mealType, ingredientRefs, reset, setView, setSelectedIngredients, setNbBackPressed}) {
    const [showNotification, setShowNotification] = useState(false);
    const [hideNotification, setHideNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("Please select an option for each selected ingredient before submitting");
    
    // Comment state hooks
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState('');

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
      
      // Pass the selected ingredients along with the comment if needed
      setSelectedIngredients({
        ...selectedIngredientsLocal,
        comment: comment 
      });
      reset();
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
        <BackButton 
          onClick={(e) => {
            setView('meal');
          }}
          setNbBackPressed={setNbBackPressed}
        />
        <h1>What did you like today?</h1>
        <p>Rate your food by clicking the icons below</p>
        <div className="food-grid">
            {ingredients.map((ingredient, index) => {
            if ((mealType === 'A' && (ingredient.type === 'Dish B' || ingredient.type === 'Dish C')) 
              || (mealType === 'B' && (ingredient.type === 'Dish A' || ingredient.type === 'Dish C'))
              || (mealType === 'C' && (ingredient.type === 'Dish A' || ingredient.type === 'Dish B'))) {
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

        {/* Comment toggle button */}
        <button 
          className="comment-toggle-btn" 
          onClick={() => setShowCommentBox(prev => !prev)}
        >
          {showCommentBox ? 'Cancel' : 'Add a comment ?'}
        </button>

        {/* Conditional comment textarea */}
        {showCommentBox && (
          <div className="comment-container">
            <textarea
              className="comment-input"
              rows="4"
              placeholder="Type your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        )}

        <button className="submit" onClick={submit}>
          Submit
        </button>
      </div>
    );
};