import RadioGroupRating from "../components/old_rating/rating.tsx";

export default function ChooseIcon({reset, rsize}) {
    return (
        <div className="container" style={{overflow: "hidden"}}>
            <h1 style={{marginBottom: rsize * 20 + "px"}}>Did you like your meal?</h1>
            <RadioGroupRating size={rsize}/>
            <button className="submit" onClick={reset}>
            Submit
            </button>
        </div>
    )
  };