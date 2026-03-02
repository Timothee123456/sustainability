import Meal from '../components/meal.jsx';

export default function ChooseMeal({ingredients, setView, setMealType, mode}) {
    return (
      <div className="container">
        <button className="back-button" onClick={(e) => {e.stopPropagation(); setView('screensaver');}}>&#8592; Back</button>
        <h1>Help improve the cantine</h1>
        <p>Choose which meal you chose today</p>
        <div className="food-grid">
          <Meal
              name={ingredients[0].name}
              img_link={ingredients[0].img_link}
              meal={'Meal A'}
              color={'255, 99, 71'}
              onClick={() => {
                if (mode === 1) {
                  setView('ingredients');
                  setMealType('A');
                } else {
                  setView('chooseIcon');
                }
              }}
            />
          <Meal
              name={ingredients[1].name}
              img_link={ingredients[1].img_link}
              meal={'Meal B'}
              color={'100, 149, 237'}
              onClick={() => {
                if (mode === 1) {
                  setView('ingredients');
                  setMealType('B');
                } else {
                  setView('chooseIcon');
                }
              }}
            />
          <Meal
              name={'Noodles Hut'}
              img_link={"./noodles_hut.jpg"}
              meal={'Meal C'}
              color={'60, 179, 113'}
              onClick={() => { setView('chooseIcon'); }}
            />
        </div>
      </div>
    )
  };