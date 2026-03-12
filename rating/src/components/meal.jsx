export default function Meal({name, img_link, meal, color, onClick }) {
    return (
        <div 
            className="food-item meal-item"
            style={{ backgroundColor: `rgba(${color}, 0.8)` }}
            onClick={onClick}
        >
            <span className="food-meal">{meal}</span>
            <div className="food-image-container">
                {Array.isArray(img_link) ? (
                    img_link.map((link, index) => (
                        <>
                            <img
                                key={index}
                                src={link}
                                className="food-image"
                                alt={name}
                            />
                            { index < img_link.length - 1 && <span style={{ margin: '0 5px' }}>+</span> }
                        </>
                    ))
                ) : (
                    <img src={img_link} className="food-image" alt={name} />
                )}
            </div>
            <span className="food-name notBold">{name}</span>
        </div>
    );
};