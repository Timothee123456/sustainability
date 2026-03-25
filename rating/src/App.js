import './App.css';
import './styling/ratingDiv.css';
import { useRef, useState, useEffect, useCallback } from 'react';
import getRandomBrightColor from './utils/randomColor.js';
import WaitScreen from './pages/waitScreen.jsx';
import Screensaver from './pages/screensaver.jsx';
import ChooseMeal from './pages/chooseMeal.jsx';
import ChooseIngredients from './pages/chooseIngredients.jsx';
import ChooseIcon from './pages/chooseIcon.jsx';

function fetchData(date) {
  /*fetch(`/api/date/12-03-2025`)
    .then((res) => {
      if (!res.ok) alert("Network response was not ok");
      return res.json();
    })
    .then((data) => response = data)
    .catch((err) => alert("Fetch error:" + err));*/
    
          const response = [
            {
              'name': 'Chicken Basquaise',
              'type': 'Dish A',
              'img_link': 'https://www.foodandwine.com/thmb/7_y1SLSmabv8G3X6-bjZkNFfgOE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Poulet-Basquaise-FT-RECIPE1023-1e5c2fc9a9324247bb91968a096066e3.jpg'
            },
            {
              'name': 'Cauliflowers & Peas Gratin',
              'type': 'Dish B',
              'img_link': 'https://www.eatingbirdfood.com/wp-content/uploads/2020/02/Spicy-Cauliflower-Sheet-Pan-Dinner-4.jpg'
            },
            {
              'name': 'Roasted Bell Peppers',
              'type': 'Vegetables',
              'img_link': 'https://healthyrecipesblogs.com/wp-content/uploads/2016/06/roasted-peppers-featured-2021.jpg'
            },
            {
              'name': 'Couscous',
              'type': 'Starch',
              'img_link': 'https://i2.wp.com/lifemadesimplebakes.com/wp-content/uploads/2021/06/perfect-couscous-square-1200.jpg'
            },
            {
              'name': 'Apple/Strawberry Compote',
              'type': 'Dessert',
              'img_link': 'https://i.pinimg.com/736x/47/20/b4/4720b49593c3e600269d80b311669431.jpg'
            }
          ];
    return response
}



function App(date = '12-03-2025') {
  const [allowedMeals, setAllowedMeals] = useState(["A", "B", "C"]); // list of total available meals: ["A", "B", "AB" "C"]
  const [ingredients, setIngredients] = useState([]);
  const [view, setView] = useState('screensaver'); // 'screensaver', 'meal', 'ingredients'
  const [mealType, setMealType] = useState('A'); // 'A' or 'B'
  const [showNotification, setShowNotification] = useState(false);
  const [hideNotification, setHideNotification] = useState(false);
  const ingredientRefs = useRef([]); // Ref to store references to Ingredient components
  const baseWidth = 300; // reference width for scaling at which rsize = 1
  const [rsize, setRsize] = useState(window.innerWidth / baseWidth); // Initialize rsize based on initial width

  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [iconValue, setIconValue] = useState(null);

  useEffect(() => {
    const ratingSize = () => {
        setRsize(window.innerWidth / baseWidth);
    };
    window.addEventListener('resize', ratingSize);  // this will adjust the rating size based on window resize

    const urlParams = new URLSearchParams(window.location.search);
    const userParameter = urlParams.get('user'); // Get the 'mode' parameter from the URL

    if (userParameter) {
      if (userParameter == "secondary"){
        setAllowedMeals(["A", "B", "C"]);
      } else if (userParameter == "teachers"){
        setAllowedMeals(["AB", "C"]);
      } else if (userParameter == "primary"){
        setAllowedMeals(["A"]);
      }
    }
  }, []); // Empty dependency array: run only once on mount


  function changeBgColor(){
    document.body.style.backgroundColor = getRandomBrightColor() // Change background color to a random bright color
  }


  useEffect(() => {
    setIngredients(fetchData(date))
    changeBgColor()
  }, []); // Empty dependency array: run only once on mount

  const reset = () => {
    ingredientRefs.current.forEach(ref => {
      if (ref && ref.reset) { // Check if the ref exists and has a reset function
        ref.reset();
      }
    });
    setView('waitScreen');
    setShowNotification(true);
    setHideNotification(false);
    setTimeout(() => {
      setHideNotification(true);
      changeBgColor();
      setTimeout(() => setShowNotification(false), 500); // Wait for slideUp animation to complete
    }, 3000); // Hide notification after 3 seconds
  }

  if (ingredients.length === 0) {
    return (
      <div className="App">
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      {showNotification && (
        <div className={`notification success ${hideNotification ? 'hide' : ''}`}>
          Your response was recorded
        </div>
      )}
      {view === 'screensaver' ? <Screensaver setView={setView} /> 
        : view === 'meal' ? <ChooseMeal ingredients={ingredients} setView={setView} setMealType={setMealType} allowedMeals={allowedMeals} />
         : view === 'ingredients' ? <ChooseIngredients ingredients={ingredients} mealType={mealType} ingredientRefs={ingredientRefs} reset={reset} setView={setView} setSelectedIngredients={setSelectedIngredients} />
          : view === 'chooseIcon' ? <ChooseIcon reset={reset} setView={setView} rsize={rsize} setIconValue={setIconValue} />
           : <WaitScreen setView={setView} selectedIngredients={selectedIngredients} iconValue={iconValue}/>}
    </div>
  );
}

export default App;
