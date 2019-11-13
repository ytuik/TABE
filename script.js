var canvas = document.getElementById("meuCanvas");
var context = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();

canvas.addEventListener("mousedown", mux);

var array = [];
var arrayPontos = [];
var arrayCurva = [];
var retaAtual = 0;
var pontoAtual = 0;

var numAvalia = document.getElementById("numAvaliacao").value;

var retaSelect = 0;

var comecoBool = false;

function comeco(){
  comecoBool = true;
  let estadoAtual = document.getElementById("nCButton").value;

  if(estadoAtual == "Nova Curva" && pontoAtual == undefined){
    // Caso: Nao faz nada até apertar "Nova Curva", primeiro ponto dessa curva

  } else if (estadoAtual == "Nova Curva") {
    // Caso: Pode começar a desenhar, nova reta a ser criada

    // Nova reta, reset de pontos usados anteriormente
    retaAtual++;
    arrayPontos = []
    
    document.getElementById("nCButton").value = "Parar Curva";

  } else {
    // Caso: Para de desenhar, botão estava "Parar Curva" e foi apertado, temos que desenhar a linha

    document.getElementById("nCButton").value = "Nova Curva";
    
    // Trava a canvas para nao desenhar mais enquanto nao aperta "Nova Curva"

    comecoBool = false;

    // Guardar o array completo de pontos dessa reta
    array.push(arrayPontos);

    // Lembrando que ao final, tem que redesenhar TUDO, ou seja, FOR de FOR para resenhar pontos e linhas
    // limparTela();

    for(let reta = 0; reta < array.length; reta++){
      if (reta != retaSelect){
        drawLine(array[reta]);
        // Tá faltando um for com drawPoint normal: botei mas nao testei
        for(let pontos = 0; pontos < array[reta].length; pontos++){
          drawPoint(array[reta][pontos].x, array[reta][pontos].y);
        }
        
      } else {
        for(let pontos = 0; pontos < array[reta].length; pontos++){
          drawPointSelect(array[reta][pontos].x, array[reta][pontos].y);
        }
        drawLineSelect(arrayPontos);
        //deCasteljau();
      }
    }
  }
}

function mux(){
  // 1 = botao esquerdo
  // 3 = botao direito
  if (event.which == 1 && comecoBool == true){
	  let xClick = event.clientX - rect.left;
    let yClick = event.clientY - rect.top;

    arrayPontos.push({x: xClick, y: yClick});
    //array.push(arrayPontos[pontoAtual++]);

    drawPoint(xClick, yClick);
   
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

function drawPointSelect(x, y){
  let ativadoPontos = document.getElementById("PConcheckbox");
  if(ativadoPontos["checked"]){ 
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI, true);
    context.moveTo(x, y);
    context.fill();
    context.stroke();
    context.strokeStyle = "#00FF00";
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

function drawLineSelect(arrayPontos){
  let ativadoPoligonais = document.getElementById("PCurcheckbox");
  if(ativadoPoligonais["checked"]){
    for(r = 1; r < arrayPontos.length; r++){
      let x2 = arrayPontos[r-1].x;
      let y2 = arrayPontos[r-1].y;
      context.moveTo(arrayPontos[r].x, arrayPontos[r].y);
      context.lineTo(x2, y2);
      context.strokeStyle = "#0000FF";
      context.fill();
      context.stroke();
    }
  }
}

function proximaReta(){
  if(retaSelect < array.length -1){
    retaSelect++;
    mudarCurva();
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
        console.log(array[retaSelect]);
      }
    }
  }
}

function anteriorReta(){
  if(retaSelect > 0){
    retaSelect--;
    mudarCurva();
    for(let reta = 0; reta < array.length; reta++){
      if (reta != retaSelect){
        drawLine(array[reta]);
        for(let pontos = 0; pontos < array[reta].length; pontos++){
          drawPoint(array[reta][pontos].x, array[reta][pontos].y);
        }
      } else {
        drawLineSelect(array[reta]);
        drawLineSelect(array[retaSelect]);
        for(let pontos = 0; pontos < array[reta].length; pontos++){
          drawPointSelect(array[reta][pontos].x, array[reta][pontos].y);
        }
      }
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
    for(var l2 = 0; l2 <= (pMedio - l)-1; l2++){
      curvaX[l2] = (1-k)*curvaX[l2] + k*curvaX[l2+1];
      curvaY[l2] = (1-k)*curvaY[l2] + k*curvaY[l2+1];
    }
  }

  output.push(curvaX[0]);
  output.push(curvaY[0]);
  
  //console.log("Curvas: ", curvaX[0], curvaY[0]);

  return output;
}

function deCasteljau(){
  pontosCas = [];
  let ativadoCurva = document.getElementById("Curcheckbox");
  if(ativadoCurva["checked"]){
    for(let i = 0; i < arrayPontos.length; i++){
      arrayCurva[i] = arrayPontos[i];
    }

    for(var k = 0; k < arrayPontos.length; k++){

      var novoCanvas  = document.getElementById("meuCanvas");
      var novoContext = novoCanvas.getContext("2d");

      novoContext.beginPath();
      novoContext.moveTo(arrayCurva[0].x, arrayCurva[0].y);

      for(var i = 0; i <= 1; i+=(1/numAvalia)){
        
        pontosBezier = curvaBezier(arrayPontos, numAvalia);

        if(retaAtual == k){
          context.strokeStyle = '#ffa500';
          context.lineTo(pontosBezier[0], pontosBezier[1]);
          context.stroke();
        } else {
          context.strokeStyle = '#000000';
          context.lineTo(pontosBezier[0], pontosBezier[1]);
          context.stroke();
        }

      }
    }
  }
}

function mudou(){
  mudarCurva();
  for(let reta = 0; reta < array.length; reta++){
    if (reta != retaSelect){
      drawLine(array[reta]);
      for(let pontos = 0; pontos < array[reta].length; pontos++){
        drawPoint(array[reta][pontos].x, array[reta][pontos].y);
      }
    } else {
      drawLineSelect(array[reta]);
      for(let pontos = 0; pontos < array[reta].length; pontos++){
        drawPointSelect(array[reta][pontos].x, array[reta][pontos].y);
      }
      //deCasteljau();
    }
  }
}
