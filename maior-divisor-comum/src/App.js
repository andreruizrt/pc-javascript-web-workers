import React, { useState } from "react";
import MeuWorker from "./worker/mdcCalculator";

import logo from "./logo.svg";
import "./App.css";
import { Input } from "./components/input/input";
import { Button } from "./components/button/button";

const App = () => {
  const [valor1, setValor1] = useState(0);
  const [valor2, setValor2] = useState(0);
  const [resultado, setResultado] = useState(0);

  const handleValor1Change = ({ target: { value } }) => {
    if (isNaN(value)) return;
    setValor1(Number(value));
  };

  const handleValor2Change = ({ target: { value } }) => {
    if (isNaN(value)) return;
    setValor2(Number(value));
  };

  const handleBotaoClick = () => {
    console.log("Executando...");

    const worker = new MeuWorker();

    const handleMessage = (event) => {
      const resultado = event.data;

      setResultado(resultado);

      worker.terminate();
    };

    worker.addEventListener("message", handleMessage);

    worker.postMessage({ valor1, valor2 });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>JavaScript Web Workers</p>
        <strong>Toy Problem - MDC</strong>

        <p>Valor 1</p>

        <Input type="text" value={valor1} onChange={handleValor1Change} />

        <p>Valor 2</p>
        <Input type="text" value={valor2} onChange={handleValor2Change} />

        <br></br>
        <Button onClick={handleBotaoClick}>Pressione</Button>

        <p>{resultado}</p>
      </header>
    </div>
  );
};

export default App;
