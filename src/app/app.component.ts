import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'desafio2';
  userToken: any;
  isShown: boolean = false;

  constructor() {
    this.userToken = localStorage.getItem('userToken');
  }
}
