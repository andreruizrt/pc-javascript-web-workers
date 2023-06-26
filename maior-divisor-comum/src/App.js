import React, { useEffect, useMemo, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { Input } from "./components/input/input";
import { Button } from "./components/button/button";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const worker = new Worker("worker.js");
const workerProcessamento = new Worker("worker-processamento.js");

const VALOR_CALCULO = 1_000_000;

const App = () => {
  const [contagem, setContagem] = useState(0);
  const [valorContagem, setValorContagem] = useState(0);
  const [contagemBloqueante, setContagemBloqueante] = useState(0);
  const [valorContagemBloqueante, setValorContagemBloqueante] = useState(0);

  useEffect(() => {
    worker.addEventListener("message", handleMessage);
    workerProcessamento.addEventListener("message", handleMessage);
  }, []);

  const handleMessage = (event) => {
    const { data } = event;

    if (data === "fim-processamento") {
      toast.error("Fim do processamento no Worker", {
        hideProgressBar: true,
      });
    }

    if (data.tipo === "contagem") return setValorContagem(data.contagem);
  };

  const handleValor3Change = ({ target: { value } }) => {
    if (isNaN(value)) return;
    setContagem(Number(value));
  };

  const changeValorBloqueante = ({ target: { value } }) => {
    if (isNaN(value)) return;
    setContagemBloqueante(Number(value));
  };

  const naoBloqueante = () => {
    toast.error("Iniciando Processamento pesado", {
      hideProgressBar: true,
    });
    worker.postMessage(contagem);
    workerProcessamento.postMessage(VALOR_CALCULO);
  };

  const contagemBloqueanteFn = async (num) => {
    const contagemRegressiva = async (num) => {
      let contagem = num;

      while (contagem > 0) {
        await sleep(1000);
        contagem--;
        setValorContagemBloqueante(contagem);
      }
    };

    contagemRegressiva(num);

    let i = 0;
    while (i < VALOR_CALCULO / 1.33) {
      console.log(VALOR_CALCULO);
      i++;
    }

    toast.error("Fim Processamento pesado Thread principal", {
      hideProgressBar: true,
    });
  };

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <p>JavaScript Web Workers</p>
        <strong>Toy Problem - MDC</strong>

        <div className="container-separator">
          <p>Envie um valor para Contagem regressiva</p>
          <Input type="text" onChange={handleValor3Change} />
          <br></br>

          {contagem ? <p>Contagem regressiva {valorContagem}...</p> : null}
        </div>
        <Button onClick={naoBloqueante}>Pressione</Button>

        <div className="container-separator">
          <p>Envie um valor para Contagem regressiva bloqueante</p>
          <Input type="text" onChange={changeValorBloqueante} />
          <br></br>

          {contagemBloqueante ? (
            <p>Contagem regressiva {valorContagemBloqueante}...</p>
          ) : null}
        </div>
        <Button
          onClick={() => {
            toast.error("Iniciando Processamento pesado", {
              hideProgressBar: true,
            });
            contagemBloqueanteFn(contagemBloqueante);
          }}
        >
          Pressione
        </Button>
      </header>
    </div>
  );
};

export default App;
