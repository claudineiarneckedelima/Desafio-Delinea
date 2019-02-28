import { Component, OnInit } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../../../global';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {
  candidateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  private getId: any;
  private action: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        cpf: ['', Validators.required],
        rg: ['', Validators.required],
        birth: ['', Validators.required],
        lattes: ['', Validators.required]
    });


    this.getId = this.activatedRoute.snapshot.url[1].path.replace(/[^\d]/g, "");

    this.http.get(GLOBAL.url+'candidate/'+this.getId).subscribe((res)=>{
        this.candidateForm.controls['firstname'].setValue(res["first_name"]);
        this.candidateForm.controls['lastname'].setValue(res["last_name"]);
        this.candidateForm.controls['email'].setValue(res["email"]);
        this.candidateForm.controls['phone'].setValue(res["phone"]);
        this.candidateForm.controls['cpf'].setValue(res["cpf"]);
        this.candidateForm.controls['rg'].setValue(res["rg"]);
        this.candidateForm.controls['birth'].setValue(res["birth_date"]);
        this.candidateForm.controls['lattes'].setValue(res["lattes"]);

    },
    error => {
        alert('Erro ao carregar candidato');
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.candidateForm.controls; }

  actionSubmit(action){
    this.action = action;
  }

  onSubmit(){
    this.submitted = true;

    if (this.candidateForm.invalid) {
        return;
    }

    this.loading = true;

    if(this.action == 'EDITAR')
      this.updateCandidate();
    else if(this.action == 'EXCLUIR')
      this.deleteCandidate();
  }

  updateCandidate(){
    this.http.put(GLOBAL.url+'candidate/'+this.getId, {
        first_name: this.candidateForm.get('firstname').value,
        last_name: this.candidateForm.get('lastname').value,
        full_name: this.candidateForm.get('firstname').value+' '+this.candidateForm.get('lastname').value,
        cpf: this.candidateForm.get('cpf').value,
        rg: this.candidateForm.get('rg').value,
        email: this.candidateForm.get('email').value,
        phone: this.candidateForm.get('phone').value,
        lattes: this.candidateForm.get('lattes').value,
        birth_date: new Date(this.candidateForm.get('birth').value).toLocaleDateString("en-US")
    }).subscribe((res)=>{

      if(res["status"] == 200){
        alert('Candidato atualizado com sucesso!');
        this.router.navigate(['/candidate']);
      }
      else
        alert('Candidato não atualizado');

    },
    error => {
        alert('Erro ao atualizar candidato');
    });
  }

  deleteCandidate(){
    this.http.delete(GLOBAL.url+'candidate/'+this.getId+'/delete').subscribe((res)=>{//<{access_token:  string}>

        if(res["status"] == 200){
          alert('Candidato deletado com sucesso!');
          this.router.navigate(['/candidate']);
        }
        else
          alert('Candidato não deletado!');

    },
    error => {
        alert('Erro ao deletar candidato');
    });
  }

}
