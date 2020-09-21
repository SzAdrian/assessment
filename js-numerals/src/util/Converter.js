let numbers = require("../data/numbers.json");

export function NumberToText(number) {
  let isPositive = number >= 0;
  number = number.toString();

  //removing "-" from the start if negative
  if (!isPositive) {
    number = number.substring(1);
  }

  //deleting zeros from the start
  number = number.replace(/^0+/g, "");
  //handling 0
  if (number == "") {
    return "zero";
  }

  //reversing to start the iterating from the "back"
  let numbersList = number
    .toString()
    .split(/(?=(?:...)*$)/)
    .reverse();

  let result = [];

  for (let chunkIndex = 0; chunkIndex < numbersList.length; chunkIndex++) {
    //reversing to start the iterating from the "back"
    const chunk = numbersList[chunkIndex].split("").reverse();
    let chunkResult = [];
    for (
      let chunkPlaceValue = 0;
      chunkPlaceValue < chunk.length;
      chunkPlaceValue++
    ) {
      const selectedNumber = chunk[chunkPlaceValue];
      //put "and" before every tens or ones
      if (chunkPlaceValue == 2 && chunkResult.length > 0)
        chunkResult.unshift("and");
      if (selectedNumber !== "0") {
        switch (chunkPlaceValue) {
          //ones place value
          case 0:
            chunkResult.unshift(numbers[selectedNumber]);
            break;
          //tens place value
          case 1:
            if (chunkResult.length === 0) {
              chunkResult.unshift(numbers[selectedNumber + "0"]);
            } else if (selectedNumber === "1") {
              chunkResult = [numbers[selectedNumber + chunk[0]]];
            } else {
              chunkResult.unshift(
                numbers[selectedNumber + "0"] + "-" + chunkResult.pop()
              );
            }
            break;
          //hundreds place value
          case 2:
            chunkResult.unshift("hundred");
            chunkResult.unshift(numbers[selectedNumber]);
            break;
          default:
            break;
        }
      }
    }
    //this part is to match the example's conversion: 1999 == nineteen hundred and ninety-nine
    const isSecondChunk = chunkIndex === 1;
    const isFirstChunkHundredsPlaceValueNotZero = numbersList[0][0] != 0;
    const isChunkOnlyOneNumber = chunk.filter((e) => e != 0).length === 1;
    if (
      isSecondChunk &&
      isFirstChunkHundredsPlaceValueNotZero &&
      isChunkOnlyOneNumber
    ) {
      let tensFirtPart = chunk[0];
      let tensSecondPart = numbersList[0][0];
      let tensTextFormat =
        tensFirtPart == 1
          ? numbers["" + tensFirtPart + tensSecondPart]
          : numbers[tensFirtPart + "0"] + "-" + numbers[tensSecondPart];

      let remainingResultToKeep = result.join("").split(" ").slice(2).join(" ");

      chunkResult = [tensTextFormat + " hundred " + remainingResultToKeep];
      result = [];
    }
    //putting "thousand","million" etc... to the end if chunk not empty
    else if (chunkResult.length > 0)
      chunkResult.push(numbers.endings[chunkIndex]);
    result.unshift(chunkResult.join(" "));
  }

  if (!isPositive) {
    result.unshift("negative");
  }
  return result.join(" ");
}