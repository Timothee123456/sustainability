import React from 'react';

const MyButton = () => {
  return (
    <a href="#" className="myButton">
      Submit
    </a>
  );
};

const buttonStyle = `
.myButton {
  box-shadow: 2px 2px 0px 0px #3dc21b;
  background:linear-gradient(to bottom, #44c767 5%, #5cbf2a 100%);
  background-color:#44c767;
  border-radius:15px;
  border:1px solid #18ab29;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;
  font-family:Georgia;
  font-size:17px;
  padding:7px 23px;
  text-decoration:none;
  text-shadow:0px 1px 0px #2f6627;
}
.myButton:hover {
  background:linear-gradient(to bottom, #5cbf2a 5%, #44c767 100%);
  background-color:#5cbf2a;
}
.myButton:active {
  position:relative;
  top:1px;
}
`;

const Style = () => {
  return <style>{buttonStyle}</style>;
};

export const App = () => {
  return (
    <div>
      <Style />
      <MyButton />
    </div>
  );
};