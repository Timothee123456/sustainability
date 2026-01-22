import Meal from '../components/meal.jsx';

export default function ChooseMeal({ingredients, setView, setmealType}) {
    return (
      <div className="container">
        <h1>Help improve the cantine</h1>
        <p>Choose which meal you chose today</p>
        <div className="food-grid">
          <Meal
              name={ingredients[0].name}
              img_link={ingredients[0].img_link}
              meal={'Meal A'}
              color={'255, 99, 71'}
              onClick={() => { setView('ingredients'); setmealType('A'); }}
            />
          <Meal
              name={ingredients[1].name}
              img_link={ingredients[1].img_link}
              meal={'Meal B'}
              color={'100, 149, 237'}
              onClick={() => { setView('ingredients'); setmealType('B'); }}
            />
          {/*<Meal
              name={'Noodles Hut'}
              img_link={"https://www.errenskitchen.com/wp-content/uploads/2018/08/quick-and-easy-chinese-noodle-soup1200.jpg"}
              meal={'Meal C'}
              color={'60, 179, 113'}
              onClick={}
            /> */}
        </div>
      </div>
    )
  };