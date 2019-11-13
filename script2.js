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
