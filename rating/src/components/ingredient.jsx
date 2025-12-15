import React, { useState } from 'react';

export default function Ingredient({ name, type, img_link }) {
    const [color, setColor] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);
    

    const handleClick = () => {
        if (isRemoved) return; // Do nothing if removed
        !color ? setColor('green') : color === 'green' ? setColor('red') : setColor(false);
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation(); // Prevent triggering the parent onClick
        setIsRemoved(!isRemoved);
        setColor(false); // Reset color when removed
    }

    const className = `food-item ${color ? color : ''} ${isRemoved ? 'darkened' : ''}`;
    const checkBoxName = isRemoved ? 'check_box_outline_blank' : 'check_box';
    
    return (
        <div 
            className={className}
            data-food={name} 
            data-type={type}
            onClick={handleClick}
        >
            {/* <i class="material-icons remove-button" onClick={handleRemoveClick}>check</i> */}
            <i class="material-icons remove-button" onClick={handleRemoveClick}>{checkBoxName}</i>
            <img
                src={img_link}
                className="food-image"
                alt=''
            />
            <span className="food-name">{name}</span>
            <span className="food-type">{type}</span>
        </div>
    );
}