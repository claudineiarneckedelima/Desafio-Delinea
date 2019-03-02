import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../../../global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private candidates: any = [];
  cTotal: any;
  cPross: any;
  cNPross: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(GLOBAL.url+'candidate').subscribe((res)=>{
      for(let i in res){
        this.candidates.push({
          is_active: res[i].is_active
        });
      }
    },
    error => {
        alert('Erro ao carregar lista de candidatos');
    });
  }

  getCandidatesTotal(){
    return this.candidates.length;
  }

  getCandidatesNoActive(){
    let count = 0;
    for(let i in this.candidates){
      if(this.candidates[i].is_active === false)
      count++;
    }
    return count;
  }

  getCandidatesActive(){
    let count = 0;
    for(let i in this.candidates){
      if(this.candidates[i].is_active === true)
      count++;
    }
    return count;
  }

}
