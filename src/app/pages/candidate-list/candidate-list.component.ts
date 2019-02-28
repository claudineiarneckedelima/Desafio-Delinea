import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../../../global';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  private nameApp: any = GLOBAL.nameApp;
  public candidates: any = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(GLOBAL.url+'candidate').subscribe((res)=>{
        for(let i in res){
          this.candidates.push({
            id: res[i].id,
            full_name: res[i].full_name,
            date_joined: new Date(res[i].date_joined).toLocaleDateString("pt-BR")
          });
        }

    },
    error => {
        alert('Erro ao carregar lista de candidatos');
    });
  }

}
