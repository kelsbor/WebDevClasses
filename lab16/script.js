let operacaoAtual = ''
let operador = ''
let resultado = 0 
atualizarTela(0)

function adicionarNumero (numero) {
    operacaoAtual += numero
    atualizarTela(operacaoAtual)
}

function adicionarOperador (operacao) {
    if (operacaoAtual !== ''){
        operador = operacao
        operacaoAtual += operador
        atualizarTela(operacaoAtual)
    }
}

function calcular () {
    try {
        resultado = eval(operacaoAtual)
        atualizarTela(resultado)
        operacaoAtual = resultado.toString()
    } 
    catch (e) {
        atualizarTela('erro')
        operacaoAtual = ''
    }
}

function limpar() {
    operacaoAtual = ''
    operador = ''
    resultado = 0
    atualizarTela(0)
}

function atualizarTela (valor) {
    document.getElementById('resultado').innerHTML = valor
}