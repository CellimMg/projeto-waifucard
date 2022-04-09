const seqCartas = [];
const divSelecionada = [];
let pontuacao = 0;

function setupInicial() {
    let qtdCartas = -1;
    do {
        qtdCartas = prompt("Olá, jogador! Vamos jogar cartas? O objetivo deste jogo é acertar o par de cartas repetidas em uma mesma jogada. Para começar, informe quantidade de cartas com as quais você deseja jogar. Lembrando que só será aceito um número PAR de 4 a 14.");
        qtdCartas = Number.parseInt(qtdCartas);
        //o jogo acontece!
    } while (qtdCartas < 4 || qtdCartas > 14 || (qtdCartas % 2 != 0));
    distribuirImagens(qtdCartas);
    atribuirLarguraAltura(qtdCartas);
    criarDivsCartas();
}

function criarDivsCartas() {
    const element = document.querySelector(".cards");
    seqCartas.forEach((elemento, index, array) => {
        element.innerHTML += `<div class="card" onclick="onClickCard(this)">
            <div class="front">
                <img src="assets/images/card-back.jpg">
            </div>
            <div class="back">
                <img src="assets/images/${array[index]}">
            </div>
        </div>`;
    });
}

function atribuirLarguraAltura(qtdCartas) {
    const cardPorLinha = qtdCartas / 2;
    atribuirLargura(cardPorLinha);
    atribuirAltura();
}

function atribuirLargura(cardPorLinha) {
    //a largura de cada carta = 137px (117 + 10px pra cada lado horizontal)
    const larguraMaxima = cardPorLinha * 137;
    const element = document.querySelector(".cards");
    element.style.maxWidth = `${larguraMaxima}px`;
    element.style.minWidth = `${137}px`;
    console.log("Low");
}

function atribuirAltura() {
    //a altura de cada carta = 166px (146px + 10px pra cada lado verticalmente)
    const alturaMinima = 166 * 2;
    const element = document.querySelector(".cards");
    element.style.minHeight = `${alturaMinima}px`;
}

function distribuirImagens(qtdCartas) {
    let contadorLoop = 0;
    //primeiro preenche o array
    while (contadorLoop < 2) { //2 vezes, uma pra cada carta do par
        for (let i = 0; i < qtdCartas / 2; i++) {
            seqCartas.push(`waifu${i + 1}.jpg`);
        }
        contadorLoop++;
    }
    randomizarPosicoes(seqCartas);
}

function randomizarPosicoes(vetor) {
    let contadorRegressivo = vetor.length;
    //agora implementa o algoritmo de shuffle para randomizar posiçoes
    while (contadorRegressivo) { //em javascript qlqr numero é true, menos 0
        const indiceAleatorio = Math.floor(Math.random() * contadorRegressivo--);
        [seqCartas[contadorRegressivo], seqCartas[indiceAleatorio]] =
            [seqCartas[indiceAleatorio], seqCartas[contadorRegressivo]];
    }
}

function onClickCard(divClicada) {
    flipCardToFront(divClicada);
    armazenarDadosClick(divClicada);
    removeClickFromCard(divClicada);
    if (hasDoubleSelected()) {
        if (isPair()) {
            pontuacao++;
            limparClicaveis();
        } else {
            setTimeout(() => {
                flipCardsToBack();
                setClickToCards();
                limparClicaveis();

            }, 1000);

        }
    }
}

function armazenarDadosClick(divClicada) {
    divSelecionada.push(divClicada);
}

function isPair() {
    const name0 = divSelecionada[0].querySelector(".back img").getAttribute("src");
    const name1 = divSelecionada[1].querySelector(".back img").getAttribute("src");
    return name0 === name1;
}

function limparClicaveis() {
    divSelecionada.length = 0;
}

function hasDoubleSelected() {
    return divSelecionada.length == 2;
}

function removeClickFromCard(divClicada) {
    divClicada.removeAttribute('onclick');
}


function setClickToCards() {
    divSelecionada[0].setAttribute('onclick', "onClickCard(this)");
    divSelecionada[1].setAttribute('onclick', "onClickCard(this)");
}

function flipCardToFront(divClicada) {
    divClicada.style.transform = "rotateY(180deg)"
}

function flipCardsToBack() {
    divSelecionada[0].style.transform = "rotateY(0deg)";
    divSelecionada[1].style.transform = "rotateY(0deg)";
}

