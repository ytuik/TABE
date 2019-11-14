var canvas  = document.getElementById("meuCanvas");
var context = canvas.getContext("2d");
var rect    = canvas.getBoundingClientRect();

canvas.addEventListener("mousedown", mux);

var array       = [];             // Array que contém retas, onde retas contém pontos x,y
var arrayPontos = [];             // Pontos recebidos ao vivo, resetados sempre que "Nova Curva" é apertado
var arrayCurva  = [];
var retaAtual   = 0;
var pontoAtual  = 0;
var numAvalia   = 15;             // Avaliacoes, padrão 15
var retaSelect  = 0;              // É o referencial para proxima reta ou anterior, no caso select = a reta "atual"
var comecoBool  = false;          // Variável do primeiro

function comeco(){
  comecoBool = true;
  let estadoAtual = document.getElementById("nCButton").value;
  
  if(estadoAtual == "Nova Curva" && pontoAtual == undefined){                 // Caso: Nao faz nada até apertar "Nova Curva", primeiro ponto dessa curva

  } else if (estadoAtual == "Nova Curva") {                                   // Caso: Pode começar a desenhar, nova reta a ser criada. Aumenta contador, reseta os pontos
    retaAtual++;
    arrayPontos = [];
    document.getElementById("nCButton").value = "Parar Curva";
  } else {
    document.getElementById("nCButton").value = "Nova Curva";                 // Muda botão
    comecoBool = false;                                                       
    array.push(arrayPontos);                                                  // Guarda pontos ao vivo na reta
    desenhar();
    //método de redesenhar tudo (ao vivo)
  }
}

function mux(){
  // 1 = botao esquerdo // 3 = botao direito
  if (event.which == 1 && comecoBool == true){
	  let xClick = event.clientX - rect.left;
    let yClick = event.clientY - rect.top;
    arrayPontos.push({x: xClick, y: yClick});
    drawPoint(xClick, yClick, -1); // Esse é o drawPoint (ao vivo)
  }
}

function drawPoint(){
  let ativadoPontos = document.getElementById("PConcheckbox");
  if(ativadoPontos["checked"]){
    for(let a = 0; a < array.length; a++){
      for(let b = 0; b < array[a].length; b++){
        if(a != retaSelect){                           // Estamos na reta com cores diferentes
          context.beginPath();
          context.arc(array[retaSelect][b].x, array[retaSelect][b].y, 3, 0, 2 * Math.PI, true);
          context.strokeStyle = "#000000";                  // Ponto selecionado tem cor verde
          context.fill();
          context.stroke();
        } else {
          context.beginPath();
          context.arc(array[retaSelect][b].x, array[retaSelect][b].y, 3, 0, 2 * Math.PI, true);
          context.strokeStyle = "#FF0000";                  // Ponto selecionado tem cor preta
          context.fill();
          context.stroke();
        }
      }
    }
  }
}

function drawLine(){
  let ativadoPoligonais = document.getElementById("PCurcheckbox");
  if(ativadoPoligonais["checked"]){
    for(let a = 0; a < array.length; a++){
      for(let b = 1; b < array[a].length - 1; b++){
        context.moveTo(array[a][b].x, array[a][b].y);
        if(a != retaSelect){                                     // Estamos na reta com cores diferentes
          context.beginPath();
          let x2 = array[a][b-1].x; let y2 = array[a][b-1].y;    // Faz a linha voltando
          context.lineTo(x2, y2);
          context.strokeStyle = "#000000";                       // Ponto selecionado tem cor verde
          context.stroke();
        } else {
          context.beginPath();
          let x2 = array[a][b-1].x; let y2 = array[a][b-1].y;    // Faz a linha voltando
          context.lineTo(x2, y2);
          context.strokeStyle = "#0000FF";                       // Ponto selecionado tem cor preta
          context.stroke();
        }
      }
    }
  }
}

function proximaReta(){
  if(retaSelect < array.length -1){
    retaSelect++;
    redesenharTudo();
  }
}

function anteriorReta(){
  if(retaSelect > 0){
    retaSelect--;
    redesenharTudo();
  }
}

function mudarCurva(){
  context.fillStyle = "#FFFFFF";
  context.beginPath();
  context.fillRect(0,0,400,400);
  context.stroke();
  context.strokeStyle = '#000000';
}

function limparTela(){
  context.fillStyle = "#FFFFFF";
  context.beginPath();
  context.fillRect(0,0,400,400);
  array = []
  arrayPontos = []
  context.stroke();
  context.strokeStyle = '#000000';
}

function curvaBezier(arrayPontos, k){
  let pMedio = arrayPontos.length/2;
  var curva = [];

  for(let p = 0; (p*2) < arrayPontos.length; p++){
    curva.push({x: Math.floor(arrayPontos[p*2].x), y: Math.floor(arrayPontos[p*2].y)});
  }

  for(let l = 0; l <= pMedio; l++){
    for(var l2 = 1; l2 <= (pMedio - l); l2++){
      curva[l2] = {x: (1-k)*curvaX[l2] + k*curvaX[l2+1], y: (1-k)*curvaY[l2] + k*curvaY[l2+1]};
    }
  }

  return curva;
}

function deCasteljau(arrayInput, ref){
  pontosCas = [];
  let ativadoCurva = document.getElementById("Curcheckbox");
  if(ativadoCurva["checked"]){
    arrayCurva = arrayInput;

    for(var k = 0; k < arrayPontos.length; k++){

      var canvas  = document.getElementById("meuCanvas");
      var context = canvas.getContext("2d");
      context.beginPath();
      context.moveTo(arrayCurva[0].x, arrayCurva[0].y);

      for(var i = 0; i <= 1; i+=(1/numAvalia)){
        pontosBezier = curvaBezier(arrayPontos, i);

        if(retaSelect == k){
          context.strokeStyle = '#00FF00';          // Reta difenciada de cor verde
          context.lineTo(pontosBezier[0].x, pontosBezier[0].y);
          context.stroke();
        } else {
          context.strokeStyle = '#000000';
          context.lineTo(pontosBezier[0].x, pontosBezier[0].y);
          context.stroke();
        }
      }

      if(retaSelect == k){
        context.strokeStyle = '#00FF00';
        context.lineTo(arrayCurva[arrayCurva.length],arrayCurva[arrayCurva.length+1]);
        context.stroke();
      } else {
        context.strokeStyle = '#000000';
        context.lineTo(arrayCurva[arrayCurva.length],arrayCurva[arrayCurva.length+1]);
        context.stroke();
      }
    }
  }
}

function mudou(){
  redesenharTudo();
  return;
}

function redesenharTudo(){                                  // ref, referencial = -1 se não for nenhuma; qualquer outro valor é a reta selecionada
  context.fillStyle = "#FFFFFF";
  context.beginPath();
  context.fillRect(0,0,400,400);
  context.stroke();
  drawPoint();
  drawLine();
  deCasteljau();
  context.strokeStyle = "#000000";
}

// Cores:
// Preto     = #000000
// Vermelho  = #FF0000
// Verde     = #00FF00
// Azul      = #0000FF
// Amarelo   = #FFFF00
// Roxo      = #993399
// Laranja   = #FF7F00
