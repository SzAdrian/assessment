import React, { useState } from "react";
import { NumberToText } from "../../util/Converter";
const MAX = 999999999999999999999999999999999999999999999999999999999999999999;
function Form({ displayRef }) {
  const [number, setNumber] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    displayRef.current.innerText = NumberToText(number);
  };
  const handleChange = (event) => {
    //handling min/max value here instead on the element because of interesting "bugs"
    if (MAX >= Math.abs(event.target.value)) setNumber(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="number-input"
        onChange={handleChange}
        value={number}
        type="number"
        step={1}
      />
      <button className="submit-btn" type="submit">
        Convert!
      </button>
    </form>
  );
}

export default Form;
