import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum-print',
  templateUrl: './curriculum-print.component.html',
  styleUrls: ['./curriculum-print.component.css']
})
export class CurriculumPrintComponent implements OnInit {
  public curriculumPrint: any = [];

  constructor() { }

  ngOnInit() {
    let curriculum = JSON.parse(localStorage.getItem('curriculum'));

      this.curriculumPrint.push({
        username: curriculum.username,
        firstname: curriculum.first_name,
        lastname: curriculum.last_name,
        email: curriculum.email,
        phone: curriculum.phone,
        cpf: curriculum.cpf,
        rg: curriculum.rg,
        birth: new Date(curriculum.birth_date).toLocaleDateString("pt-BR"),
        lattes:  curriculum.lattes
      });

      //window.print();
  }

}
