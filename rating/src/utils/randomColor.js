export default function getRandomBrightColor() {
  // Function to generate a random number between 210 and 255 (inclusive).
  function getRandomValue() {
    return Math.floor(Math.random() * (255 - 210 + 1)) + 210;
  }

  // Generate random values for red, green, and blue components.
  const red = getRandomValue();
  const green = getRandomValue();
  const blue = getRandomValue();

  // Return the color as an RGB string.
  return `rgb(${red}, ${green}, ${blue})`;
}