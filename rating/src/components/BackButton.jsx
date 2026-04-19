export default function BackButton({ onClick, setNbBackPressed }) {
  return (
    <button
      className="back-button"
      onClick={(e) => {
        e.stopPropagation();
        setNbBackPressed((prev) => prev + 1);
        onClick();
      }}
    >&#8592; Back</button>
  );
}