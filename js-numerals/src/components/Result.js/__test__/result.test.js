import React from "react";
import ReactDOM from "react-dom";
import ResultDisplay from "../ResultDisplay";
import { render } from "@testing-library/react";
import { NumberToText } from "../../../util/Converter";
const each = require("jest-each").default;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ResultDisplay />, div);
});

it("test empty input", () => {
  const emptyInput = "  ";
  expect(NumberToText(emptyInput)).toEqual(`"${emptyInput}" is not a number`);
});

it("test not number", () => {
  const notANumber = "iam not a number";
  const { getByTestId } = render(<ResultDisplay />);
  getByTestId("result").innerHTML = NumberToText(notANumber);
  expect(getByTestId("result")).toHaveTextContent(
    `"${notANumber}" is not a number`
  );
});
it("ignores 0s on the begining of number", () => {
  const { getByTestId } = render(<ResultDisplay />);
  getByTestId("result").innerHTML = NumberToText("00000000000010");
  expect(getByTestId("result")).toHaveTextContent("ten");
});

describe("test with specific numbers", () => {
  each([
    [0, "zero"],
    [1, "one"],
    [55, "fifty-five"],
    [400, "four hundred"],
    [1500, "fifteen hundred"],
    [35000, "thirty-five thousand"],
    [100000, "one hundred thousand"],
    [1500000, "one million five hundred thousand"],
    [300500900, "three hundred million five hundred thousand nine hundred"],
  ]).it("when the input is %s", (number, expected) => {
    const { getByTestId } = render(<ResultDisplay />);
    getByTestId("result").innerHTML = NumberToText(number);
    expect(getByTestId("result")).toHaveTextContent(expected);
  });
});
describe("test with random numbers", () => {
  each([
    [
      2384283466,
      "two billion three hundred and eighty-four million two hundred and eighty-three thousand four hundred and sixty-six",
    ],
    [11897, "eleven thousand eight hundred and ninety-seven"],
    [
      9999999999999999999999999999999999999n,
      "nine undecillion nine hundred and ninety-nine decillion nine hundred and ninety-nine nonillion nine hundred and ninety-nine octillion nine hundred and ninety-nine septillion nine hundred and ninety-nine sextillion nine hundred and ninety-nine quintillion nine hundred and ninety-nine quadrillion nine hundred and ninety-nine trillion nine hundred and ninety-nine billion nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine",
    ],
    [2302, "twenty-three hundred and two"],
    [
      101010101010101010n,
      "one hundred and one quadrillion and ten trillion one hundred and one billion and ten million one hundred and one thousand and ten",
    ],
    [
      66642069,
      "sixty-six million six hundred and forty-two thousand and sixty-nine",
    ],
    [
      123456789,
      "one hundred and twenty-three million four hundred and fifty-six thousand seven hundred and eighty-nine",
    ],
  ]).it("when the input is %s", (number, expected) => {
    const { getByTestId } = render(<ResultDisplay />);
    getByTestId("result").innerHTML = NumberToText(number);
    expect(getByTestId("result")).toHaveTextContent(expected);
  });
});
