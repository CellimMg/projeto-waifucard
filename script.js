let seqCartas = [];

function setupInicial() {
    let qtdCartas = prompt("Olá, jogador! Vamos jogar cartas? O objetivo deste jogo é acertar o par de cartas repetidas em uma mesma jogada. Para começar, informe quantidade de cartas com as quais você deseja jogar. Lembrando que só será aceito um número PAR de 4 a 14.");
    if (qtdCartas >= 4 && qtdCartas <= 14 && (qtdCartas % 2 == 0)) { //o jogo acontece!
        distribuirImagens(qtdCartas);
    }
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
