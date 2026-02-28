import Ingredient from '../components/ingredient.jsx';

export default function ChooseIngredients({ingredients, mealType, ingredientRefs, reset}) {
    return (
      <div className="container">
        <h1>What did you like today?</h1>
        <p>Rate your food by clicking the icons below</p>
        <div className="food-grid">
            {ingredients.map((ingredient, index) => {
            if (mealType === 'A' && ingredient.type === 'Dish B') {
              return null;
            }
            if (mealType === 'B' && ingredient.type === 'Dish A') {
              return null;
            }
            return (
              <Ingredient
                key={index}
                name={ingredient.name}
                type={ingredient.type}
                img_link={ingredient.img_link}
                ref={el => (ingredientRefs.current[index] = el)} // Assign ref to each Ingredient
              />
            );
          })}
        </div>
        <button className="submit" onClick={reset}>
          Submit
        </button>
      </div>
    )
  };