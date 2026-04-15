import { useState, useEffect } from 'react';
import style from'../styling/waitScreen.module.css';

export default function WaitScreen({setView, selectedIngredients, iconValue, setMessage}) {
    const [count, setCount] = useState(3);

    useEffect(() => {
    const sendData = async () => {
      const data = iconValue == null ? JSON.stringify(selectedIngredients) : iconValue;

      try {
        const response = await fetch("/api/store", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: data,
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();
        const msg = result.success ? "Data sent successfully!" : "Failed to send data.";
        setMessage(msg);
        console.log(msg);
      } catch (error) {
        console.log("Error sending data:", error);
        setMessage("Error sending data.");
      }
    };

    sendData();
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
