var canvas = document.getElementById("meuCanvas");
var context = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();

canvas.addEventListener("mousedown", mux);

var array = [];
var arrayPontos = [];
var retaAtual = 0;
var pontoAtual = 0;

var comecoBool = false;

function comeco(){
  comecoBool = true;
  let estadoAtual = document.getElementById("nCButton").value;

  if(estadoAtual == "Nova Curva" && pontoAtual == undefined){
    // Nao faz nada até apertar "Nova Curva", primeiro ponto dessa curva
  } else if (estadoAtual == "Nova Curva") {
    // Pode começar a desenhar, nova reta a ser criada
    document.getElementById("nCButton").value = "Parar Curva";
  } else {
    // Para de desenhar, está "Parar Curva", desenha a linha
    document.getElementById("nCButton").value = "Nova Curva";
    drawLine(arrayPontos);
  }
}

function mux(){
  // 1 = botao esquerdo
  // 3 = botao direito
  if (event.which == 1 && comecoBool == true){
	  let xClick = event.clientX - rect.left;
    let yClick = event.clientY - rect.top;

    arrayPontos.push({x: xClick, y: yClick});
    array.push(arrayPontos[pontoAtual++]);

    drawPoint(xClick, yClick);
   
  }
  /* if(comecoBool){
      console.log("aaaaa")
      if(arrayPontos[retaAtual].length > 1){
        drawLine(array[retaAtual]);
      }
      comecoBool = false;
    }
  */
}


function drawPoint(x, y){ 
  context.beginPath();
  context.arc(x, y, 1, 0, 2 * Math.PI, true);
  context.moveTo(x, y);
  context.fill();
  context.stroke();
}

function drawLine(arrayPontos){
  for(r = 1; r < arrayPontos.length; r++){
    let x2 = arrayPontos[r].x;
    let y2 = arrayPontos[r].y;
    context.moveTo(arrayPontos[r-1].x, arrayPontos[r-1].y);
    context.lineTo(x2, y2);
    context.strokeStyle = "#000000";
    context.fill();
    context.stroke();
  }

}
