import React, { useState } from "react";
import { NumberToText } from "../../util/Converter";
import styled from "styled-components";

const MAX = 999999999999999999999999999999999999999999999999999999999999999999;

const FormStyle = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  * {
    outline: none;
    border: 0.2rem solid rgb(26 188 156 / 16%);
  }
  input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  .number-input {
    max-width: 65vw;
    min-width: 50px;
    width: ${({ inputValue }) =>
      inputValue == 0 ? "2rem" : `${Math.floor(inputValue.length * 18.5)}PX`};
    border-top-left-radius: 100vw;
    border-bottom-left-radius: 100vw;
    border-right: none;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    transition: width 0.3s ease-in-out;
    :focus-within {
      border-color: #1abc9c;
    }
  }

  .submit-btn {
    border-top-right-radius: 100vw;
    border-bottom-right-radius: 100vw;
    border-left: none;
    background-color: #1abc9c;
    font-size: 1.5rem;
    color: white;
    font-weight: 900;
    transition: background-color 0.2s ease;
    padding: 0.3rem 0.7rem;
    :hover {
      cursor: pointer;
      background-color: #48c9b0;
    }
  }
`;
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
    <FormStyle inputValue={number} onSubmit={handleSubmit}>
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
    </FormStyle>
  );
}

export default Form;
