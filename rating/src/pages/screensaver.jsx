import React, { useEffect } from 'react';
import "../styling/screensaver.css";

export default function Screensaver({ setView }) {
    useEffect(() => {
        const handleClick = () => {
            setView('meal');
        };

        document.body.onclick = handleClick;

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            document.body.onclick = null;
        };
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    
    return (
      <div className="container">
        <div className="screensaver-content">
          <h1>Rate the cantine!</h1>
          <p>1. please select your meal (A, B, or C)</p>
          <p>2. then rate the ingredients</p>
          <div className="screensaver-box">
            <div className="screensaver-key">
              <span className="material-icons gold">stars</span> Exceptional
            </div>
            <div className="screensaver-key">
              <span className="material-icons green">thumb_up</span> Liked it
            </div>
            <div className="screensaver-key">
              <span className="material-icons red">thumb_down</span> Didn't like it
            </div>
          </div>
        </div>
        <button className="screensaver-button">Start</button>
        <p className="screensaver-instruction">Click anywhere to begin</p>
      </div>
    )
}