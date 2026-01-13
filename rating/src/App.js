import './App.css';
import './components/ratingDiv.css';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import getRandomBrightColor from './utils/randomColor.js';
import Ingredient from './components/ingredient.jsx';
import Meal from './components/meal.jsx';

function App(date = '12-03-2025') {
  const [ingredients, setIngredients] = useState([]);
  const [view, setView] = useState('meal');
  const [mealType, setmealType] = useState('A'); // 'A' or 'B'
  const ingredientRefs = useRef([]); // Ref to store references to Ingredient components

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
    changeBgColor();
    setView('meal');
  }

  const next = () => {
    // Logic to go to the next step
  };
  
  const ChooseMeal = () => {
    return (
      <div className="container">
        <h1>What meal did you take today?</h1>
        <p>Choose which meal you chose today</p>
        <div className="food-grid">
          <Meal
              name={ingredients[0].name}
              img_link={ingredients[0].img_link}
              meal={'Meal A'}
              color={'255, 99, 71'}
              onClick={() => { setView('ingredients'); setmealType('A'); }}
            />
          <Meal
              name={ingredients[1].name}
              img_link={ingredients[1].img_link}
              meal={'Meal B'}
              color={'100, 149, 237'}
              onClick={() => { setView('ingredients'); setmealType('B'); }}
            />
          {/*<Meal
              name={'Noodles Hut'}
              img_link={"https://www.errenskitchen.com/wp-content/uploads/2018/08/quick-and-easy-chinese-noodle-soup1200.jpg"}
              meal={'Meal C'}
              color={'60, 179, 113'}
              onClick={}
            /> */}
        </div>
      </div>
    )
  };
  
  
  const ChooseIngredients = () => {
    return (
      <div className="container">
        <h1>What did you like today?</h1>
        <p>First remove what you didn't take, then rate your food</p>
        <div className="food-grid">
            {ingredients.map((ingredient, index) => {
            if (mealType === 'A' && ingredient.type === 'Dish B') {
              return null;
            }
            if (mealType === 'B' && ingredient.type === 'Dish A') {
              return null;
            }
            return (
              <Ingredient
                key={index}
                name={ingredient.name}
                type={ingredient.type}
                img_link={ingredient.img_link}
                ref={el => (ingredientRefs.current[index] = el)} // Assign ref to each Ingredient
              />
            );
          })}
        </div>
        <a className="submit" onClick={reset}>
          Submit
        </a>
      </div>
    )
  };

  if (ingredients.length === 0) {
    return (
      <div className="App">
        Loading...
      </div>
    );
  }
  return (
    <div className="App">
      {view === 'meal' ? <ChooseMeal /> : <ChooseIngredients />}
    </div>
  );
}

export default App;
