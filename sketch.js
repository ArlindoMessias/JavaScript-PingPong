let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro/2;

let velocidadeXBolinha = 4;
let velocidadeYBolinha = 4;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 40;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0,0,150);
    mostraBolinha(); //mostrar bolinha
    movimentaBolinha(); //movimentar bolinha
    verificaColisaoBorda(); //verifica colisao com borda
    
    mostraDivisorMesa(300,0);
    //funções jogador
    mostraRaquete(xRaquete, yRaquete); //exibe raquete
    movimentaMinhaRaquete(); //movimenta raquete
    //verificaColisaoRaquete();
    colisaoMinhaRaqueteBiblioteca(xRaquete, yRaquete); //verifica colisão da bolinha -raquete
  
    //funções oponente
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);//exibe raquete oponente
    movimentaRaqueteOponente(); //movimenta raquete oponente
    colisaoMinhaRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente); //verifica colisão da bolinha -raquete oponente
    
    incluiPlacar();
    marcaPonto();
   
}

function mostraBolinha() {
    
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(x,y) {
    fill(color('rgb(200,20,20)'));
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento
        && yBolinha - raio < yRaquete + raqueteAltura
        && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}


function colisaoMinhaRaqueteBiblioteca(x,y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function movimentaRaqueteOponente() {
  /*  if (keyIsDown(87)) {
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)) {
        yRaqueteOponente += 10;
    }*/
    velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}
function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function mostraDivisorMesa(x,y) {
    rect(x, y, 2, 600);
}