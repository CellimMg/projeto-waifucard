let seqCartas = [];
let divSelecionada = [];
let pontuacao = 0; //a cada acerto aumenta
let qtdJogadas = 0;
let intervalController;
let seconds = 0;
let minutes = 0;
let qtdCartas = 0;
let lastClick

function setupInicial() {
    qtdCartas = -1;
    do {
        qtdCartas = prompt("Olá, jogador! Vamos jogar cartas? O objetivo deste jogo é acertar o par de cartas repetidas em uma mesma jogada. Para começar, informe quantidade de cartas com as quais você deseja jogar. Lembrando que só será aceito um número PAR de 4 a 14.");
        qtdCartas = Number.parseInt(qtdCartas);
        //o jogo acontece!
    } while (qtdCartas < 4 || qtdCartas > 14 || (qtdCartas % 2 != 0));
    distribuirImagens(qtdCartas);
    atribuirLarguraAltura(qtdCartas);
    criarDivsCartas();
    setTimer();
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
    if (lastClick >= Date.now() - 1000) { ///
        return;
    } else {
        qtdJogadas++;
        atribuirJogadas(qtdJogadas);
        flipCardToFront(divClicada);
        armazenarDadosClick(divClicada);
        removeClickFromCard(divClicada);
        if (hasDoubleSelected()) {
            if (isPair()) {
                pontuacao++;
                limparClicadas();
            } else {
                setTimeout(() => {
                    flipCardsToBack();
                    setClickToCards();
                    limparClicadas();
                }, 1000);
            }

            //se venceu!
            if (pontuacao * 2 == qtdCartas) {
                setTimeout(() => {
                    cancelTimer();
                    alert(`Você venceu em ${qtdJogadas} jogadas e ${seconds + (minutes * 60)} segundos!`);
                    const jogarNovamente = prompt('Deseja jogar novamente?');
                    if (jogarNovamente === "sim") {
                        const element = document.querySelector(".cards");
                        element.innerHTML = "";
                        clean();
                        setupInicial();
                    }
                }, 600);

            }
        }
    }

    lastClick = Date.now();
}

function armazenarDadosClick(divClicada) {
    divSelecionada.push(divClicada);
}

//FUNCOES COMPARATIVAS
function isPair() {
    const name0 = divSelecionada[0].querySelector(".back img").getAttribute("src");
    const name1 = divSelecionada[1].querySelector(".back img").getAttribute("src");
    return name0 === name1;
}

function hasDoubleSelected() {
    return divSelecionada.length == 2;
}

function limparClicadas() {
    divSelecionada.length = 0;
}

function removeClickFromCard(divClicada) {
    divClicada.removeAttribute('onclick');
}

function setClickToCards() {
    divSelecionada[0].setAttribute('onclick', "onClickCard(this)");
    divSelecionada[1].setAttribute('onclick', "onClickCard(this)");
}


//FUNCOES DO TIMER
function setTimer() {
    intervalController = setInterval(() => {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }

        atribuirTempo();
    }, 1000);
}

function cancelTimer() {
    clearInterval(intervalController);
}

//FUNCOES VISUAIS
function flipCardToFront(divClicada) {
    divClicada.style.transform = "rotateY(180deg)"
}

function flipCardsToBack() {
    divSelecionada[0].style.transform = "rotateY(0deg)";
    divSelecionada[1].style.transform = "rotateY(0deg)";
}

function atribuirTempo() {
    const element = document.querySelector(".placar div:last-child div:first-child");
    let minutesText, secondsText;
    if (minutes >= 10) {
        minutesText = minutes.toString();
    } else {
        minutesText = `0${minutes}`;
    }
    if (seconds >= 10) {
        secondsText = seconds.toString();
    } else {
        secondsText = `0${seconds}`;
    }
    element.innerHTML = `${minutesText}:${secondsText}`;
}

function atribuirJogadas(qtdJogadas) {
    const element = document.querySelector(".placar div:last-child div:last-child");
    element.innerHTML = qtdJogadas;
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
}

function atribuirAltura() {
    //a altura de cada carta = 166px (146px + 10px pra cada lado verticalmente)
    const alturaMinima = 166 * 2;
    const element = document.querySelector(".cards");
    element.style.minHeight = `${alturaMinima}px`;
}

function clean() {
    seconds = 0;
    minutes = 0;
    seqCartas = [];
    divSelecionada = [];
    pontuacao = 0;
    qtdJogadas = 0;
    atribuirJogadas(qtdJogadas);
    qtdCartas = 0;
}
