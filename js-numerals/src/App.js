import React, { useRef } from "react";
import Form from "./components/Form/Form";
import ResultDisplay from "./components/Result.js/ResultDisplay";
import "./styles.css";

function App() {
  const displayRef = useRef(null);
  return (
    <>
      <Form displayRef={displayRef} />{" "}
      <ResultDisplay elementRef={displayRef}></ResultDisplay>
    </>
  );
}

export default App;
