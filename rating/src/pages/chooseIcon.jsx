import React, { useState, useRef } from "react";
import RadioGroupRating from "../components/old_rating/rating.tsx";
import BackButton from '../components/BackButton.jsx';

export default function ChooseIcon({reset, setView, rsize, setIconValue, setNbBackPressed}) {
    const [value, setValue] = React.useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [hideNotification, setHideNotification] = useState(false);
    const timeoutRef = useRef(null);
      

    function submit(){
        if (value === null) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            
            setShowNotification(true);
            setHideNotification(false);
            timeoutRef.current = setTimeout(() => {
                setHideNotification(true);
                setTimeout(() => setShowNotification(false), 500); // Wait for slideUp animation to complete
            }, 2000);
            return;
        }
        setIconValue(value)
        reset();
    }

    return (
        <div className="container" style={{overflow: "hidden"}}>
            {showNotification && (
                <div className={`notification error ${hideNotification ? 'hide' : ''}`}>
                Please select an option before submitting
                </div>
            )}
            <BackButton 
                onClick={(e) => {
                    setView('meal');
                }}
                setNbBackPressed={setNbBackPressed}
            />
            <h1 style={{marginBottom: rsize * 25 + "px"}}>How was your meal?</h1>
            <RadioGroupRating size={rsize} onChange={(value) => setValue(value)}/>
            <button className="submit" onClick={submit}>
            Submit
            </button>
        </div>
    )
  };