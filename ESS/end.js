var canvas = document.getElementById("meuCanvas");
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
var ctx = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();
var checkPoint = document.getElementsByName("check1");
var matriz = [];
var matrizaux = [];
var comecoBool;
var retaSelect = 0;
var avaliat = 15;
var dragok = false;
var lastX;
var lastY;

var rmPonto = false;
var mkPonto = false;

var actualCurve;
var actualPoint;

function myMove(e) {
    if (dragok) {
        matriz[actualCurve][actualPoint * 2] = e.pageX - canvas.offsetLeft;
        matriz[actualCurve][(actualPoint * 2) + 1] = e.pageY - canvas.offsetTop;
        redesenharTudo();
    }
}

function myDown(e) {
    if (mkPonto) inserirPonto();
    if (rmPonto) removerPonto();
    for (var j = 0; j < matriz.length; j++) {
        var arraux = matriz[j];
        for (var i = 0; ((i * 2) + 1) < arraux.length; i++) {
            let x = arraux[i * 2];
            let y = arraux[(i * 2) + 1];
            
            if (e.pageX < x + 5 + canvas.offsetLeft && e.pageX > x - 5 +
                canvas.offsetLeft && e.pageY < y + 5 + canvas.offsetTop &&
                e.pageY > y - 5 + canvas.offsetTop) {
                actualCurve = j
                actualPoint = i;
                arraux[i * 2] = e.pageX - canvas.offsetLeft;
                arraux[(i * 2) + 1] = e.pageY - canvas.offsetTop;
                dragok = true;
                canvas.onmousemove = myMove;
            }
        } 
    }
}

function myUp() {
    dragok = false;
    canvas.onmousemove = null;
}

function mudou(){
    avaliat = document.getElementById("numAvaliacao").value;
    redesenharTudo();
}

function criandoReta(){
    if(comecoBool){
        matrizaux.push(event.clientX-rect.left);
        matrizaux.push(event.clientY-rect.top);
        drawPointAoVivo();
    }
}

function comeco(){
    if(!comecoBool){
        document.getElementById("criar").innerHTML = "Parar Curva";
        comecoBool = true;
    } else {
        document.getElementById("criar").innerHTML = "Nova Curva"; 
        comecoBool = false;
        if(matrizaux.length>0){
            matriz.push(matrizaux);
        }
        matrizaux = [];
        redesenharTudo();
    }
}

function apagarReta(){
    matriz.splice(retaSelect,1);
    if(retaSelect>matriz.length-1){
        retaSelect--;
    }
    if(retaSelect < 0){
        retaSelect = 0;
    }
    redesenharTudo();
}

function anteriorReta(){
    if(retaSelect>0){
        retaSelect--;
        redesenharTudo();
    }
}

function proximaReta(){
    if(retaSelect<matriz.length-1){
            retaSelect++;
            redesenharTudo();
        }
}

function drawPointAoVivo(){
    var checkPoint = document.getElementsByName("check1");
    if(checkPoint[0].checked){
        var arraux = matrizaux;
        for(var i = 0; ((i*2)+1)<arraux.length;i++){
            ctx.beginPath();
            ctx.arc(arraux[i*2],arraux[(i*2)+1],5, 0, 2 * Math.PI);
            ctx.fillStyle = '#000000';
            ctx.fill();
            ctx.stroke();
        }
    }
}

function drawPoint(){
    var checkPoint = document.getElementsByName("check1");
    if(checkPoint[0].checked){
        for(var j = 0; j<matriz.length;j++){
            var arraux = matriz[j];
            if(retaSelect == j){
                for(var i = 0; ((i*2)+1)<arraux.length;i++){
                    ctx.strokeStyle = '#FF0000';
                    ctx.beginPath();
                    ctx.arc(arraux[i*2],arraux[(i*2)+1],5, 0, 2 * Math.PI);
                    ctx.fillStyle = '#FF0000';
                    ctx.fill();
                    ctx.stroke();
                    
                }
            } else {
                for(var i = 0; ((i*2)+1)<arraux.length;i++){
                    ctx.strokeStyle = '#000000';
                    ctx.beginPath();
                    ctx.arc(arraux[i*2],arraux[(i*2)+1],5, 0, 2 * Math.PI);
                    ctx.fillStyle = '#000000';
                    ctx.fill();
                    ctx.stroke();
                } 
            }
        }
    }
}

function drawLine(){
    var checkPCtrl = document.getElementsByName("check2"); 
    if(checkPCtrl[0].checked){
        for(var j = 0; j<matriz.length;j++){
            var arraux = matriz[j];
            ctx.moveTo(arraux[0],arraux[1]);
            if(retaSelect === j){
                ctx.strokeStyle = '#2bff00';
                ctx.beginPath();
                for(var i = 0; ((i*2)+1)<arraux.length;i++){
                    ctx.lineTo(arraux[i*2],arraux[(i*2)+1]);
                    ctx.stroke();
                }
            } else {
                ctx.strokeStyle = '#000000';
                ctx.beginPath();
                for(var i = 0; ((i*2)+1)<arraux.length;i++){
                    ctx.lineTo(arraux[i*2],arraux[(i*2)+1]);
                    ctx.stroke();
                } 
            }
        }
    }
}

function bezier(t,arr){
    var n = arr.length/2;
    var aupx = [];
    var retorm = [];

    for(var k = 0; (k*2)<arr.length;k++){
        aupx.push(Math.floor(arr[k*2]));
    }

    var aupy = [];
    for(var k = 0; ((k*2)+1)<arr.length;k++){
        aupy.push(Math.floor(arr[(k*2)+1]));
    }

    for(var k =1;k<=n;k++){
        for(var p =0;p<=(n-k)-1;p++){
            aupx[p] = (1-t)*aupx[p] + t*aupx[p+1];
            aupy[p] = (1-t)*aupy[p] + t*aupy[p+1];
        }
    }
    retorm.push(aupx[0]);
    retorm.push(aupy[0]);
    return retorm;
}

function deCasteljau(){
    var checkCurve = document.getElementsByName("check3");
    var pointes = [];
    if(checkCurve[0].checked){
        for(var j = 0; j<matriz.length;j++){
            var c = document.getElementById("meuCanvas");
            var ctx = c.getContext("2d");
            var arraux = matriz[j];
            ctx.beginPath();
            ctx.moveTo(arraux[0],arraux[1]);
            for(var i = 0; i<=1;i+=(1/avaliat)){
                pointes = bezier(i,arraux);
                if(retaSelect === j){
                    ctx.strokeStyle = '#0084ff';
                    ctx.lineTo(pointes[0],pointes[1]);
                    ctx.stroke();
                } else {
                    ctx.strokeStyle = '#000000';
                    ctx.lineTo(pointes[0],pointes[1]);
                    ctx.stroke();
                }
            }
            if(retaSelect === j){
                ctx.strokeStyle = '#0084ff';

                ctx.lineTo(arraux[arraux.length-2],arraux[arraux.length-1]);
                ctx.stroke();
            } else {
                ctx.strokeStyle = '#000000';
                ctx.lineTo(arraux[arraux.length-2],arraux[arraux.length-1]);
                ctx.stroke();
            }
        } 
    }
}

function redesenharTudo(){
    if(!comecoBool){
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.fillRect(0,0,400,400);
        ctx.stroke();
        drawLine();
        drawPoint();
        deCasteljau();
        ctx.strokeStyle = '#000000';
    }
}

function alteraPonto(){
    console.log("RM", rmPonto, "MK", mkPonto);
    if(rmPonto || mkPonto){                                 // Se um dos dois tiver apertado 
        if(rmPonto ^ mkPonto){                              // XOR: Mas nao os dois apertados ao mesmo tempo
            if(rmPonto){                                    // Se for o remover que estiver apertado   
                document.getElementById("removerP").innerHTML = "Qual botão?";
                let x = event.clientX-rect.left;
                let y = event.clientY-rect.top;
                console.log("Tentando remover o par:", x, y);
                let rmPosicao = matriz[retaSelect].indexOf(x); // Tenho que saber onde ele sabe que foi clicado e passar como parâmetro no indexOf
                if(rmPosicao > -1){
                    matriz[retaSelect].splice(rmPosicao, 2); // dada a rmPosicao, removo 2 itens a partir dela = remove x e depois y
                    redesenharTudo();
                    document.getElementById("removerP").innerHTML = "Remover Ponto";
                }
                rmPonto = false;
            }
            else{
                document.getElementById("removerP").innerHTML = "Onde?";
                criandoReta();
                document.getElementById("removerP").innerHTML = "Inserir Ponto";
                mkPonto = false;
            }
        } return;
    }
    return;
}

function inserirPonto(){
    mkPonto = true;
    alteraPonto();
}

function removerPonto(){
    rmPonto = true;
    alteraPonto();
}