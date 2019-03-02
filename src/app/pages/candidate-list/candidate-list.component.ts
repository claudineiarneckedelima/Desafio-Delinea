import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../../../global';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  //private nameApp: any = GLOBAL.nameApp;
  public is_active: any = '';
  public candidates: any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.is_active = params['is_active']
    });

    this.http.get(GLOBAL.url+'candidate?is_active='+this.is_active).subscribe((res)=>{
        for(let i in res){
          if(String(res[i].is_active) === this.is_active){
            this.candidates.push({
              id: res[i].id,
              full_name: res[i].full_name,
              date_joined: new Date(res[i].date_joined).toLocaleDateString("pt-BR")
            });
          }
        }

    },
    error => {
        alert('Erro ao carregar lista de candidatos');
    });
  }

}
