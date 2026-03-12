import './App.css';
import './styling/ratingDiv.css';
import { useRef, useState, useEffect, useCallback } from 'react';
import getRandomBrightColor from './utils/randomColor.js';
import WaitScreen from './pages/waitScreen.jsx';
import Screensaver from './pages/screensaver.jsx';
import ChooseMeal from './pages/chooseMeal.jsx';
import ChooseIngredients from './pages/chooseIngredients.jsx';
import ChooseIcon from './pages/chooseIcon.jsx';
/*
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
    fetchData();
    changeBgColor()
  }, []); // Empty dependency array: run only once on mount

  const fetchData = async () => {
      try {
          const response = [
            {
              'name': 'Pork',
              'type': 'Dish A',
              'img_link': 'https://www.lovefoodhatewaste.com/sites/default/files/styles/16_9_two_column/public/2022-08/Pork-sh1419942758.jpg.webp?itok=_Ow0IXe6'
            },
            {
              'name': 'Eggplant',
              'type': 'Dish B',
              'img_link': 'https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/eggplant.jpg.webp?itok=k6_74IzB'
            },
            {
              'name': 'Cabbage',
              'type': 'Vegetables',
              'img_link': 'https://greengarden.ph/cdn/shop/products/LINE_ALBUM_PICTURE_230412_85.jpg?v=1681290016'
            },
            {
              'name': 'Rice',
              'type': 'Starch',
              'img_link': 'https://healthynibblesandbits.com/wp-content/uploads/2018/10/Jasmine-Rice-FF.jpg'
            },
            {
              'name': 'Sponge cake',
              'type': 'Dessert',
              'img_link': 'https://www.laserbiscuit.com/wp-content/uploads/2021/03/sponge-cake-stuck.jpg'
            }
          ];
          setIngredients(response);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

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
}*/


function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    // If you set the "proxy" in package.json, use "/index"
    // Otherwise, use the full URL: "http://127.0.0.1"
    fetch("/index")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text(); // Use .json() if your Flask returns jsonify()
      })
      .then((data) => setMessage(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Flask + React Connection</h1>
      <p>Message from Backend: <strong>{message}</strong></p>
    </div>
  );
}

export default App;
