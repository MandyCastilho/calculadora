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

    function backspace() {
        display.value = display.value.slice(0, -1);
    }

    function alternarSinal() {
        if (display.value) {
            if (display.value.startsWith("-")) {
                display.value = display.value.slice(1);
            } else {
                display.value = "-" + display.value;
            }
        }
    }

    function adicionarPorcentagem() {
        let valor = parseFloat(display.value);
        if (!isNaN(valor)) {
            display.value = valor / 100;
            salvarHistorico(`${valor}% = ${display.value}`);
        }
    }

    function calcularResultado() {
        try {
            let expressao = display.value;
            if (expressao.trim() === "" || /[+\-*/.]$/.test(expressao)) {
                display.value = "Erro";
                return;
            }
            let resultado = eval(expressao);
            salvarHistorico(`${expressao} = ${resultado}`);
            display.value = resultado;
        } catch (e) {
            display.value = "Erro";
        }
    }

    function calcularRaiz() {
        let valor = parseFloat(display.value);
        if (!isNaN(valor)) {
            display.value = Math.sqrt(valor);
            salvarHistorico(`√${valor} = ${display.value}`);
        }
    }

    function calcularPotencia() {
        let valor = parseFloat(display.value);
        if (!isNaN(valor)) {
            display.value = Math.pow(valor, 2);
            salvarHistorico(`${valor}² = ${display.value}`);
        }
    }

    function calcularLog() {
        let valor = parseFloat(display.value);
        if (!isNaN(valor) && valor > 0) {
            display.value = Math.log10(valor).toFixed(4);
            salvarHistorico(`log(${valor}) = ${display.value}`);
        }
    }

    function calcularTrigonometria(tipo) {
        let graus = parseFloat(display.value);
        if (!isNaN(graus)) {
            let rad = graus * (Math.PI / 180);
            let resultado;
            if (tipo === 'sin') resultado = Math.sin(rad);
            else if (tipo === 'cos') resultado = Math.cos(rad);
            else if (tipo === 'tan') resultado = Math.tan(rad);
            display.value = resultado.toFixed(4);
            salvarHistorico(`${tipo}(${graus}) = ${display.value}`);
        }
    }

    function salvarHistorico(entrada) {
        let historico = JSON.parse(localStorage.getItem('historicoCalc')) || [];
        historico.push(entrada);
        localStorage.setItem('historicoCalc', JSON.stringify(historico));
        atualizarHistorico();
    }

    function atualizarHistorico() {
        const lista = document.getElementById('listaHistorico');
        if (!lista) return;
        lista.innerHTML = '';
        const historico = JSON.parse(localStorage.getItem('historicoCalc')) || [];
        historico.slice().reverse().forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            lista.appendChild(li);
        });
    }

    function limparHistorico() {
        localStorage.removeItem('historicoCalc');
        atualizarHistorico();
    }

    // Suporte ao teclado
    document.addEventListener("keydown", (event) => {
        const key = event.key;
        if (!isNaN(key) || "+-*/".includes(key)) {
            adicionarNumero(key);
        } else if (key === "Enter") {
            calcularResultado();
        } else if (key === "Backspace") {
            backspace();
        } else if (key === "Escape") {
            limparDisplay();
        } else if (key === ".") {
            adicionarPonto();
        }
    });

    // Tornando funções acessíveis ao HTML
    window.adicionarNumero = adicionarNumero;
    window.adicionarOperacao = adicionarOperacao;
    window.adicionarPonto = adicionarPonto;
    window.limparDisplay = limparDisplay;
    window.calcularResultado = calcularResultado;
    window.calcularRaiz = calcularRaiz;
    window.calcularPotencia = calcularPotencia;
    window.calcularLog = calcularLog;
    window.calcularTrigonometria = calcularTrigonometria;
    window.backspace = backspace;
    window.alternarSinal = alternarSinal;
    window.adicionarPorcentagem = adicionarPorcentagem;
    window.limparHistorico = limparHistorico;

    atualizarHistorico();
});