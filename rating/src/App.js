import './App.css';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import getRandomBrightColor from './utils/randomColor.js';
import Ingredient from './components/ingredient.jsx';

function App(date = '12-03-2025') {
  const [ingredients, setIngredients] = useState([]);
  const ingredientRefs = useRef([]); // Ref to store references to Ingredient components

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

  function changeBgColor(){
    document.body.style.backgroundColor = getRandomBrightColor() // Change background color to a random bright color
  }

  const reset = () => {
    ingredientRefs.current.forEach(ref => {
      if (ref && ref.reset) { // Check if the ref exists and has a reset function
        ref.reset();
      }
    });
    changeBgColor();
  }

  return (
    <div className="container">
      <h1>What ingredients did you like today?</h1>
      <div class="food-grid">
        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={index}
            name={ingredient.name}
            type={ingredient.type}
            img_link={ingredient.img_link}
            ref={el => (ingredientRefs.current[index] = el)} // Assign ref to each Ingredient
          />
        ))}
      </div>
      <a className="submit" onClick={reset}>
        Submit
      </a>
    </div>
  );
}

export default App;
