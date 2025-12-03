import './App.css';
import { useState, useEffect } from 'react';
import getRandomBrightColor from './utils/randomColor.js';
import BasicRating from './components/old_rating/rating.tsx';
import Ingredient from './components/ingredient.jsx';

function changeBgColor(){
  document.body.style.backgroundColor = getRandomBrightColor() // Change background color to a random bright color
}

function App(date = '12-03-2025') {
  const baseWidth = 300; // reference width for scaling at which rsize = 1
  const [rsize, setRsize] = useState(window.innerWidth / baseWidth); // Initialize rsize based on initial width

  useEffect(() => {
    const ratingSize = () => {
      setRsize(window.innerWidth / baseWidth);
    };
    window.addEventListener('resize', ratingSize);  // this will adjust the rating size based on window resize

    changeBgColor()
  }, []); // Empty dependency array: run only once on mount

  function spacing(value){
    return { marginBottom: value * rsize }
  }
  
  return (
    <div  className="container">
      <h1>What ingredients did you like today?</h1>
      <div class="food-grid">
        <Ingredient name="Pork" type="Dish A" img_link="https://www.lovefoodhatewaste.com/sites/default/files/styles/16_9_two_column/public/2022-08/Pork-sh1419942758.jpg.webp?itok=_Ow0IXe6" />
        <Ingredient name="Eggplant" type="Dish B" img_link="https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/eggplant.jpg.webp?itok=k6_74IzB" />
        <Ingredient name="Cabbage" type="Vegetables" img_link="https://greengarden.ph/cdn/shop/products/LINE_ALBUM_PICTURE_230412_85.jpg?v=1681290016" />
        <Ingredient name="Rice" type="Starch" img_link="https://healthynibblesandbits.com/wp-content/uploads/2018/10/Jasmine-Rice-FF.jpg" />
        <Ingredient name="Sponge cake" type="Dessert" img_link="https://www.laserbiscuit.com/wp-content/uploads/2021/03/sponge-cake-stuck.jpg" />
      </div>
      <a className="myButton" onClick={changeBgColor}>
        Submit
      </a>
    </div>
  );
}

export default App;
