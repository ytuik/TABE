import { Component } from '@angular/core';
import { Usuario } from '../usuario';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BibPET';

  loginErrado: boolean = false;

  usuario: Usuario = new Usuario();

  onMode(): void {
    this.loginErrado = false;
  }
}

