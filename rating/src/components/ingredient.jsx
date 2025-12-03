import React, { useState } from 'react';

export default function Ingredient({ name, type, img_link }) {
    const [color, setColor] = useState(false);
    

    const handleClick = () => {
        !color ? setColor('green') : color === 'green' ? setColor('red') : setColor(false);
    };

    const className = `food-item ${color ? color : ''}`;
    
    return (
        <div 
            className={className}
            data-food={name} 
            data-type={type}
            onClick={handleClick}
        >
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