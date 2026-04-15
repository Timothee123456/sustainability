import './App.css';
import './styling/ratingDiv.css';
import { useRef, useState, useEffect, useCallback } from 'react';
import getRandomBrightColor from './utils/randomColor.js';
import WaitScreen from './pages/waitScreen.jsx';
import Screensaver from './pages/screensaver.jsx';
import ChooseMeal from './pages/chooseMeal.jsx';
import ChooseIngredients from './pages/chooseIngredients.jsx';
import ChooseIcon from './pages/chooseIcon.jsx';

async function fetchData(date) {
  console.log("fetchData called for:", `/api/date/${date}`);

  try {
    const res = await fetch(`/api/date/${date}`);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Network response not ok`);
    }

    const data = await res.json();
    if (data == false){
        console.log("DATA ERROR")
        return null
    }
    console.log("✅ SUCCESS DATA:", data);
    return data;  // Returns actual data!

  } catch (err) {
    console.error("❌ Fetch error:", err);
    alert("Fetch error: " + err.message);
    return null;  // or throw err
  }
}

function App(date = '12-03-2026') {
  const [allowedMeals, setAllowedMeals] = useState(["A", "B", "C"]); // list of total available meals: ["A", "B", "AB" "C"]
  const [ingredients, setIngredients] = useState([]);
  const [view, setView] = useState('screensaver'); // 'screensaver', 'meal', 'ingredients'
  const [mealType, setMealType] = useState('A'); // 'A' or 'B'
  const [messageNotification, setMessageNotification] = ""
  const [showNotification, setShowNotification] = useState(false);
  const [hideNotification, setHideNotification] = useState(false);
  const ingredientRefs = useRef([]); // Ref to store references to Ingredient components
  const baseWidth = 300; // reference width for scaling at which rsize = 1
  const [rsize, setRsize] = useState(window.innerWidth / baseWidth); // Initialize rsize based on initial width

  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [iconValue, setIconValue] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);

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


  useEffect(() => {
    if (view === 'screensaver') {
      setStartTime(null);
      setElapsedTime(null);
      setSelectedIngredients({});
      setIconValue(null);
    } else if (view === 'meal' && startTime === null) {
      // Start timestamp when entering 'meal' view
      setStartTime(Date.now());
      setElapsedTime(null);
    }
  }, [view]);


  function changeBgColor(){
    document.body.style.backgroundColor = getRandomBrightColor() // Change background color to a random bright color
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB');
  const formattedDateNew = formattedDate.replace(/\//g, '-');
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData(formattedDateNew);
        setIngredients(data);  // Now sets actual data!
        console.log("✅ Ingredients set:", data);
      } catch (err) {
        console.error("❌ Failed to load data:", err);
      }
    };
    loadData();
    changeBgColor()
  }, []); // Empty dependency array: run only once on mount

  const reset = () => {
    ingredientRefs.current.forEach(ref => {
      if (ref && ref.reset) { // Check if the ref exists and has a reset function
        ref.reset();
      }
    });
    const endTime = Date.now();
    const elapsed = Math.round((endTime - startTime));
    setElapsedTime(elapsed);
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
           : <WaitScreen setView={setView} selectedIngredients={selectedIngredients} iconValue={iconValue} setMessage={setMessageNotification} />}
    </div>
  );
}

export default App;
