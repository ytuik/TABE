function tentarLogin(){
    var username = document.getElementById("usuarioLogin").value;
    var password = document.getElementById("usuarioSenha").value;

    var petianos = ["accs2", "jgnvs", "som3", "jhmn", "vss2"];

    if (username == "admin" && password == "admin"){
        alert ("Logado como administrador");
        // window.location = "administrador.html"; Manda para outra page;
        return false;
    } else if (petianos.includes(username)){
        alert("Logado como usuário");
    } else {
        alert("Login incorreto");
    }
}