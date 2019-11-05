import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username, password) {
    const usuarios = ['vss2@cin.ufpe.br', 'som3@cin.ufpe.br', 'accs2@cin.ufpe.br', 'jhmn@cin.ufpe.br', 'jgnvs@cin.ufpe.br'];

    if (usuarios.includes(username) && password === "senha" || username.endsWith('@pet.cin.ufpe.br')) {
      sessionStorage.setItem('usuarioLogado', username)
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('usuarioLogado')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('usuarioLogado')
  }
}
