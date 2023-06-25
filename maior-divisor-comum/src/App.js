import React, { useState } from 'react';
import MeuWorker from './worker/mdcCalculator';

import logo from './logo.svg';
import './App.css';

const App = () => {
  const [valor1, setValor1] = useState(0);
  const [valor2, setValor2] = useState(0);
  const [resultado, setResultado] = useState(0);

  const handleValor1Change = (event) => {
    setValor1(event.target.value);
  };

  const handleValor2Change = (event) => {
    setValor2(event.target.value);
  };

  const handleBotaoClick = () => {
    console.log("Executando...")

    const worker = new MeuWorker();

    const handleMessage = (event) => {
      const resultado = event.data;

      setResultado(resultado);

      worker.terminate();
    };

    worker.addEventListener('message', handleMessage);

    worker.postMessage({ valor1, valor2 });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>JavaScript Web Workers</p>
        <p>Toy Problem - MDC</p>

        <p>Valor 1</p>
        <input type="text" value={valor1} onChange={handleValor1Change} />

        <p>Valor 2</p>
        <input type="text" value={valor2} onChange={handleValor2Change} />

        <button onClick={handleBotaoClick}>Pressione</button>

        <p>{resultado}</p>

      </header>
    </div>
  );
}

export default App;



