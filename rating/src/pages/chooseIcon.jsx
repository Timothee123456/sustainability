import RadioGroupRating from "../components/old_rating/rating.tsx";
import React, { useState, useRef } from "react";

export default function ChooseIcon({reset, setView, rsize}) {
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
        reset();
    }

    return (
        <div className="container" style={{overflow: "hidden"}}>
            {showNotification && (
                <div className={`notification error ${hideNotification ? 'hide' : ''}`}>
                Please select an option before submitting
                </div>
            )}
            <button className="back-button" onClick={(e) => {e.stopPropagation(); setView('meal');}}>&#8592; Back</button>
            <h1 style={{marginBottom: rsize * 20 + "px"}}>How was your meal?</h1>
            <RadioGroupRating size={rsize} onChange={(value) => setValue(value)}/>
            <button className="submit" onClick={submit}>
            Submit
            </button>
        </div>
    )
  };