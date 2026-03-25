import { useState, useEffect } from 'react';
import style from'../styling/waitScreen.module.css';

export default function WaitScreen({setView, selectedIngredients, iconValue}) {
    const [count, setCount] = useState(3);

    useEffect(() => {
      const sendData = async () => {
        const data = iconValue == null ? JSON.stringify(selectedIngredients) : iconValue
        try {
          console.log(data)
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };

      sendData(); // Call the sendData function when the component mounts
    }, []);

    useEffect(() => {
      if (count > 0) {
          const timer = setTimeout(() => {
            setCount(count - 1);
          }, 1000);

          return () => clearTimeout(timer); // Cleanup function to clear the timeout
      } else {
          setView('screensaver');
      }
    }, [count]);
    return (
      <div className="container">
        <h1>Thank you for your feedback!</h1>
        <p>Please wait while we process your response.</p>
        <div className={style.countdownContainer}>
          <div className={style.countdown}>{count}</div>
        </div>
      </div>
    )
  };