import React, { useRef } from "react";
import Form from "./components/Form/Form";
import ResultDisplay from "./components/Result.js/ResultDisplay";
import Title from "./components/Title/Title";
import "./styles.css";

function App() {
  const displayRef = useRef(null);

  return (
    <>
      <Title title={"Number to Text Converter"} />
      <Form displayRef={displayRef} /> <ResultDisplay elementRef={displayRef} />
    </>
  );
}

export default App;
