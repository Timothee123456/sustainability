export default function Meal({name, img_link, meal, color, onClick }) {
    return (
        <div 
            className="food-item meal-item"
            style={{ backgroundColor: `rgba(${color}, 0.8)` }}
            onClick={onClick}
        >
            <span className="food-meal">{meal}</span>
            <img
                src={img_link}
                className="food-image"
                alt=""
            />
            <span className="food-name notBold">{name}</span>
        </div>
    );
};