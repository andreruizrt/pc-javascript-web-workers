self.addEventListener("message", ({ data }) => {
  let i = 0;
  while (i < data) {
    console.warn(data);
    i++;
  }

  self.postMessage("fim-processamento");
});
