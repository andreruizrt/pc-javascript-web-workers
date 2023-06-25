const calcularMDC = (num1, num2) => {

    if (num1 === undefined || num2 === undefined) {
        return 0
    }

    if (num1 === 0 || num2 === 0) {
        return 0
    }

    console.log('Parâmetros recebidos:', num1, num2);

    var resto;

    do {
        resto = num1 % num2;
        num1 = num2;
        num2 = resto;

    } while (resto != 0);

    return num1;

}

window.self.addEventListener('message', (event) => {
    const { num1, num2 } = event.data;

    calcularMDC(num1, num2);
});