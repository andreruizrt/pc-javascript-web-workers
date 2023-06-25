const calcularMDC = (num1, num2) => {

    console.log('Parâmetros recebidos:', num1, num2);

    var resto;

    do {

        resto = num1 % num2;

        num1 = num2;

        num2 = resto;

    } while (resto != 0);

    return num1;

}

self.addEventListener('message', (event) => {
    const { num1, num2 } = event.data;

    calcularMDC(num1, num2);
});