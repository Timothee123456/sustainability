import RadioGroupRating from "../components/old_rating/rating.tsx";

export default function ChooseIcon({reset}) {
    return (
        <div>
            <RadioGroupRating />
            <button className="submit" onClick={reset}>
            Submit
            </button>
        </div>
    )
  };