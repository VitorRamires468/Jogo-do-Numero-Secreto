let listaDeNumerosSorteados = [];
let elementos = 10;

function exibirTextoNaTela(tag, texto) {
  let conteudo = document.querySelector(tag);
  conteudo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10:");
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * elementos + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
  if (quantidadeDeElementosNaLista == elementos) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numeroSecreto) {
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    exibirTextoNaTela("h1", "Acertou!");
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número é menor que o chute");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas++;
  }
  limparCampo();
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

function limparCampo() {
  document.querySelector("input").value = "";
}

exibirMensagemInicial();
