import './App.css';
import { useState, useEffect } from 'react';
import getRandomBrightColor from './utils/randomColor.js';
import BasicRating from './rating/rating.tsx';

function changeBgColor(){
  document.body.style.backgroundColor = getRandomBrightColor() // Change background color to a random bright color
}

function App() {
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
      <h1 style={spacing(20)}>How did you like the food today?</h1>
      <BasicRating size={rsize} />
      <br/>
      <br/>
      <br/>
      <br/>
      <a className="myButton" onClick={changeBgColor}>
        Submit
      </a>
    </div>
  );
}

export default App;
