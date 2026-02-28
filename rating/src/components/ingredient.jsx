import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import '../styling/ratingDiv.css'

const Ingredient = forwardRef(({ name, type, img_link }, ref) => {
    useImperativeHandle(ref, () => ({reset: reset}));
    const [color, setColor] = useState(false);
    const [isRemoved, setIsRemoved] = useState(true);
    const greenRef = useRef(null);
    const redRef = useRef(null);
    const goldRef = useRef(null);

    function changeRating(e, new_color) {
        e.stopPropagation();
        if (isRemoved) setIsRemoved(false);
        resetColor();

        if (color !== new_color) {
            setColor(new_color);
            // Add .selected to the clicked span
            const refMap = { green: greenRef, red: redRef, gold: goldRef };
            refMap[new_color].current?.classList.add('selected');
        }
    }

    const handleRemoveClick = (e) => {
        e.stopPropagation(); // Prevent triggering the parent onClick
        setIsRemoved(!isRemoved);
        setColor(false); // Reset color when removed
        resetColor()
    }

    const resetColor = () => {
        setColor(false);
        greenRef.current?.classList.remove('selected');
        redRef.current?.classList.remove('selected');
        goldRef.current?.classList.remove('selected');
    }

    const reset = () => {
        resetColor();
        setIsRemoved(false);
    };

    function onclick() {
        if (isRemoved){
            setIsRemoved(false);
        }
    }

    const className = `food-item ${color ? color : ''} ${isRemoved ? 'darkened' : ''}`;
    const checkBoxName = isRemoved ? 'check_box_outline_blank' : 'check_box';
    
    return (
        <div 
            className={className}
            data-food={name} 
            data-type={type}
            onClick={onclick}
        >
            {/* <i className="material-icons remove-button" onClick={handleRemoveClick}>check</i> */}
            <i className="material-icons remove-button" onClick={handleRemoveClick}>{checkBoxName}</i>
            <img
                src={img_link}
                className="food-image"
                alt=''
            />
            <span className="food-name">{name}</span>
            <span className="food-type">{type}</span>

            <div className="rating_icons">
                <span className="material-icons green" onClick={(e) => changeRating(e, 'green')} ref={greenRef}>thumb_up</span>
                <span className="material-icons red" onClick={(e) => changeRating(e, 'red')} ref={redRef}>thumb_down</span>
                <span className="material-icons gold" onClick={(e) => changeRating(e, 'gold')} ref={goldRef}>stars</span>
            </div>
        </div>
    );
});

export default Ingredient;