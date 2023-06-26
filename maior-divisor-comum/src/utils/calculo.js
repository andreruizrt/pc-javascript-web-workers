export const calcularMDC = (num1, num2) => {
  if (!num1 && !num2) {
    console.log("return condicao 1");
    return;
  }

  if (num1 === 0 || num2 === 0) {
    console.log("return condicao 2");
    return 0;
  }

  let resto;

  do {
    resto = num1 % num2;
    num1 = num2;
    num2 = resto;
  } while (resto !== 0);

  return num1;
};
