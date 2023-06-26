self.addEventListener("message", ({ data }) => {
  contagemRegressiva(data);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const contagemRegressiva = async (num) => {
  let contagem = num;

  while (contagem >= 0) {
    await sleep(1000);
    postMessage({ tipo: "contagem", contagem });
    contagem--;
  }
};
