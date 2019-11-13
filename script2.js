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
var retaSelect  = 0;
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
    comecoBool = false;                                                       // 
    array.push(arrayPontos);                                                  // Guarda pontos ao vivo na reta

    //método de redesenhar tudo (ao vivo)
  }
}

function mux(){
  // 1 = botao esquerdo // 3 = botao direito
  if (event.which == 1 && comecoBool == true){
	  let xClick = event.clientX - rect.left;
    let yClick = event.clientY - rect.top;
    arrayPontos.push({x: xClick, y: yClick});
    drawPoint(xClick, yClick); // Esse é o drawPoint (ao vivo)
  }
}

function drawPoint(x, y){
  let ativadoPontos = document.getElementById("PConcheckbox");
  if(ativadoPontos["checked"]){
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI, true);
    context.moveTo(x, y);
    context.fill();
    context.stroke();
    context.strokeStyle = "#000000";
  }
}

function drawLine(arrayPontos){
  let ativadoPoligonais = document.getElementById("PCurcheckbox");
  if(ativadoPoligonais["checked"]){
    for(r = 1; r < arrayPontos.length; r++){
      let x2 = arrayPontos[r-1].x;
      let y2 = arrayPontos[r-1].y;
      context.moveTo(arrayPontos[r].x, arrayPontos[r].y);
      context.lineTo(x2, y2);
      context.strokeStyle = "#000000";
      context.fill();
      context.stroke();
    }
  }
}

function proximaReta(){
  if(retaSelect < array.length -1){
    retaSelect++;
    for(let reta = 0; reta < array.length; reta++){
      if (reta != retaSelect){
        drawLine(array[reta]);
        for(let pontos = 0; pontos < array[reta].length; pontos++){
          drawPoint(array[reta][pontos].x, array[reta][pontos].y);
        }
      } else {
        drawLineSelect(array[retaSelect]);
        for(let pontos = 0; pontos < array[reta].length; pontos++){
          drawPointSelect(array[reta][pontos].x, array[reta][pontos].y);
        }
      }
      deCasteljau(array[reta]);
    }
  }
}

function anteriorReta(){
  if(retaSelect > 0){
    retaSelect--;
    for(let reta = 0; reta < array.length; reta++){
      if (reta != retaSelect){
        drawLine(array[reta]);
        for(let pontos = 0; pontos < array[reta].length; pontos++){
          drawPoint(array[reta][pontos].x, array[reta][pontos].y);
        }
      } else {
        drawLineSelect(array[retaSelect]);
        for(let pontos = 0; pontos < array[reta].length; pontos++){
          drawPointSelect(array[reta][pontos].x, array[reta][pontos].y);
        }
      }
      deCasteljau(array[reta]);
    }
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
  var curvaX = [];
  var curvaY = [];
  var output = [];

  for(let pX = 0; (pX*2) < arrayPontos.length; pX++){
    curvaX.push(Math.floor(arrayPontos[pX*2].x));
  }

  for(let pY = 0; (pY*2) < arrayPontos.length; pY++){
    curvaY.push(Math.floor(arrayPontos[(pY*2)].y));
  }

  for(let l = 1; l <= pMedio; l++){
    for(var l2 = 0; l2 <= (pMedio - l); l2++){
      curvaX[l2] = (1-k)*curvaX[l2] + k*curvaX[l2+1];
      curvaY[l2] = (1-k)*curvaY[l2] + k*curvaY[l2+1];
    }
  }

  output.push(curvaX[0]);
  output.push(curvaY[0]);

  return output;
}

function deCasteljau(arrayInput){
  pontosCas = [];
  let ativadoCurva = document.getElementById("Curcheckbox");
  if(ativadoCurva["checked"]){

    arrayCurva = arrayPontos;

    for(var k = 0; k < arrayPontos.length; k++){

      var canvas  = document.getElementById("meuCanvas");
      var context = canvas.getContext("2d");

      context.beginPath();
      context.moveTo(arrayCurva[0].x, arrayCurva[0].y);

      for(var i = 0; i <= 1; i+=(1/numAvalia)){
        
        pontosBezier = curvaBezier(arrayPontos, i);

        if(retaAtual == k){
          context.strokeStyle = '#ffa500';
          context.lineTo(pontosBezier[0], pontosBezier[1]);
          context.stroke();
        } else {
          context.strokeStyle = '#ffa600';
          context.lineTo(pontosBezier[0], pontosBezier[1]);
          context.stroke();
        }

      }
      if(retaAtual == k){
        context.strokeStyle = '#ffa600';
        context.lineTo(arrayCurva[arrayCurva.length],arrayCurva[arrayCurva.length+1]);
        context.stroke();
      }else{
        context.strokeStyle = '#ffa600';
        context.lineTo(arrayCurva[arrayCurva.length],arrayCurva[arrayCurva.length+1]);
        context.stroke();
      }
    }
  }
}
