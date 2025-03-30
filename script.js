document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");

    function adicionarNumero(numero) {
        display.value += numero;
    }

    function adicionarOperacao(operador) {
        let ultimoCaractere = display.value.slice(-1);
        if (display.value !== "" && !"+-*/".includes(ultimoCaractere)) {
            display.value += operador;
        }
    }

    function adicionarPonto() {
        let partes = display.value.split(/[\+\-\*\/]/);
        let ultimaParte = partes[partes.length - 1];
        if (!ultimaParte.includes(".")) {
            display.value += ".";
        }
    }

    function limparDisplay() {
        display.value = "";
    }

    function calcularResultado() {
        try {
            let expressao = display.value;
            if (expressao.trim() === "" || /[+\-*/.]$/.test(expressao)) {
                display.value = "Erro";
                return;
            }
            // Usando eval para calcular a expressão
            display.value = eval(expressao); // eval pode ser perigoso, mas aqui está sendo usado com cautela
        } catch (e) {
            display.value = "Erro";
        }
    }

    // Adicionando suporte ao teclado
    document.addEventListener("keydown", (event) => {
        const key = event.key;
        if (!isNaN(key) || "+-*/".includes(key)) {
            adicionarNumero(key);
        } else if (key === "Enter") {
            calcularResultado();
        } else if (key === "Backspace") {
            display.value = display.value.slice(0, -1);
        } else if (key === "Escape") {
            limparDisplay();
        } else if (key === ".") {
            adicionarPonto();
        }
    });

    // Tornando as funções acessíveis ao HTML
    window.adicionarNumero = adicionarNumero;
    window.adicionarOperacao = adicionarOperacao;
    window.adicionarPonto = adicionarPonto;
    window.limparDisplay = limparDisplay;
    window.calcularResultado = calcularResultado;
});
