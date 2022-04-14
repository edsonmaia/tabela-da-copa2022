let url = ''
// requisicao dos dados json
const listarJogos = (url) => {
    return fetch(`jogos-${url}.json`)
    .then( resposta => resposta.json())
}

const ocultarRodadas = () => {
    document.querySelector('.tabela-de-jogos').classList.add('ocultar')
}

const mostrarRodadas = () => {
    document.querySelector('.tabela-de-jogos').classList.remove('ocultar')
}

const ocultarFaseFinal = () => {
    document.querySelector('#divFinais').classList.add('ocultar')
}

const mostrarFaseFinal = () => {
    document.querySelector('#divFinais').classList.remove('ocultar')
}

// cards das fase de grupos
const criarCardJogo = () => {
    let listaDeJogos = document.querySelector('.listaDeJogos').cloneNode(true)
    document.querySelector('.tabela-de-jogos').append(listaDeJogos)
    return listaDeJogos
}

const preencherCardJogos = (lista, jogo, indice) => {
    lista[indice].querySelector('.grupo').innerHTML = `Grupo ${jogo.grupo}`
    lista[indice].querySelector('.data').innerHTML = `${jogo.diaSemana} ${jogo.data} às ${jogo.hora}`
    lista[indice].querySelector('.partida').innerHTML = `<img class="bandeirap" src="./images/bandeiras/${jogo.mandante}" alt="" />
    ${jogo.partida}
    <img class="bandeirap" src="./images/bandeiras/${jogo.visitante}" alt="" />`
    lista[indice].querySelector('.estadio').innerHTML = `${jogo.estadio}`
}

const renderizar = (url) => {
    mostrarRodadas()
    ocultarFaseFinal()
    listarJogos(url)
    .then(dado => {
        document.querySelector('.rodada').innerHTML = `${dado[0].rodada}ª rodada`
        dado.map((jogo, indice) => {
            preencherCardJogos(cardsRodadas, jogo, indice)
        })
    })
}

// criar cards para fase de grupo
let numeroDeJogos = 16
let cardsRodadas = []
for(let i = 0; i < numeroDeJogos; i++ ) {
    cardsRodadas[i] = criarCardJogo()
}
//console.log(cards)

const toggleGrupos = () => {
    document.querySelector('.divGrupo').classList.add('ocultar')
}

// renderizando a nossa tela 1ª rodada
renderizar(1)

//// /RODADAS ////

////////// FASES ELIMINATORIAS /////////////
// clonar elemento e colocar no local
const criarCard = (elemento, local) => {
    let card = document.querySelector(elemento).cloneNode(true)
    document.querySelector(local).append(card)
    return card
}

const preencherCardJogosFinais = (lista, jogo, indice) => {
    lista[indice].querySelector('.fase').innerHTML = `${jogo.rodada}`
    lista[indice].querySelector('.data').innerHTML = `${jogo.diaSemana} ${jogo.data} às ${jogo.hora}`
    lista[indice].querySelector('.partida').innerHTML = `<img class="bandeirap" src="./images/bandeiras/${jogo.mandante}" alt="" />
    ${jogo.partida}
    <img class="bandeirap" src="./images/bandeiras/${jogo.visitante}" alt="" />`
    lista[indice].querySelector('.estadio').innerHTML = `${jogo.estadio}`
}

let cardsOitavas = []
let cardsQuartas = []
let cardsSemi = []
let cardsTerceiro = []
let cardsFinal = []

function criarVariosCards(quant, elemento, qualCard, ondeColocar) {
    for(let i = 0; i < quant; i++) {
        qualCard[i] = criarCard(elemento, ondeColocar)
        //console.log(qualCard)
    }
}

criarVariosCards(8, '.listaDeJogosFinais', cardsOitavas, '.tabela-de-jogos-oitavas')
criarVariosCards(4, '.listaDeJogosFinais', cardsQuartas, '.tabela-de-jogos-quartas')
criarVariosCards(2, '.listaDeJogosFinais', cardsSemi, '.tabela-de-jogos-semi')
criarVariosCards(1, '.listaDeJogosFinais', cardsTerceiro, '.tabela-de-jogos-terceiro')
criarVariosCards(1, '.listaDeJogosFinais', cardsFinal, '.tabela-de-jogos-final')

/*
// criar cards das fases finais
let numeroDeJogosOitavas = 8
let cardsRodadasFinais = []
for(let i = 0; i < numeroDeJogosOitavas; i++) {
    cardsRodadasFinais[i] = criarCard('.listaDeJogosFinais', '.tabela-de-jogos-oitavas')
}
//console.log(cardsRodadasFinais)
*/

const renderizarFinais = (url, fase) => {
    ocultarRodadas()
    mostrarFaseFinal()
    
    listarJogos(url)
    .then(dado => {
        document.querySelector('.rodada').innerHTML = `${dado[0].rodada}`
        dado.map((jogo, indice) => {
            preencherCardJogosFinais(fase, jogo, indice)
        })
    })
}
//renderizarFinais('oitavas')
