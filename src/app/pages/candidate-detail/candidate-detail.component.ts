import { Component, OnInit } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../../../../global';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {
  private password: any;
  private date_joined: any;
  candidateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  private getId: any;
  private action: any;

  private httpOptions: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {

    localStorage.setItem("userToken", "gVdxbctnzdQHpVjHld7DK86AGmr31i");

    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': "Bearer "+localStorage.getItem('userToken'),
        'Content-Type': 'application/json'
      })
    };

    this.candidateForm = this.formBuilder.group({
        password: ['', ''],
        confirm_password: ['', ''],
        username: ['', Validators.required],
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
        this.password     = res["password"];
        this.date_joined  = res["date_joined"];
        this.candidateForm.controls['username'].setValue(res["username"]);
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

    if(this.candidateForm.get('password').value !== this.candidateForm.get('confirm_password').value){
      alert('As senhas não conferem!');
      return
    }

    this.loading = true;

    if(this.action == 'EDITAR')
      this.updateCandidate();
    else if(this.action == 'EXCLUIR')
      this.deleteCandidate();
  }

  updateCandidate(){

    const newPassword = (this.candidateForm.get('confirm_password').value) ? this.candidateForm.get('password').value : this.password;

    console.log(JSON.stringify({
        password: newPassword,
        first_name: this.candidateForm.get('firstname').value,
        last_name: this.candidateForm.get('lastname').value,
        full_name: this.candidateForm.get('firstname').value+' '+this.candidateForm.get('lastname').value,
        cpf: this.candidateForm.get('cpf').value,
        rg: this.candidateForm.get('rg').value,
        email: this.candidateForm.get('email').value,
        phone: this.candidateForm.get('phone').value,
        lattes: this.candidateForm.get('lattes').value,
        birth_date: this.candidateForm.get('birth').value,
        last_login: null,
        is_superuser: false,
        is_staff: false,
        is_active: true,
        date_joined: this.date_joined,
        username: this.candidateForm.get('username').value,
        confirm_username: true,
        is_social: false,
        publisher: true,
        name: this.candidateForm.get('firstname').value,
        about: "",
        groups: [],
        user_permissions: []}))

    this.http.put(GLOBAL.url+'candidate/'+this.getId, {
        "password": newPassword,
        "last_login": null,
        "is_superuser": false,
        "full_name": this.candidateForm.get('firstname').value+' '+this.candidateForm.get('lastname').value,
        "first_name": this.candidateForm.get('firstname').value,
        "last_name": this.candidateForm.get('lastname').value,
        "email": this.candidateForm.get('email').value,
        "is_staff": false,
        "is_active": true,
        "date_joined": this.date_joined,
        "username": this.candidateForm.get('username').value,
        "confirm_username": true,
        "is_social": false,
        "phone": "1",
        "publisher": true,
        "name": this.candidateForm.get('firstname').value,
        "cpf": this.candidateForm.get('cpf').value,
        "rg": this.candidateForm.get('rg').value,
        "birth_date": this.candidateForm.get('birth').value,
        "lattes": this.candidateForm.get('lattes').value,
        "about": "",
        "groups": [],
        "user_permissions": []
    }, this.httpOptions).subscribe((res)=>{
        alert('Candidato atualizado com sucesso!');
        this.router.navigate(['/candidate']);

    },
    error => {
        alert('Erro ao atualizar candidato');
    });
  }

  deleteCandidate(){
    this.http.delete(GLOBAL.url+'candidate/'+this.getId+'/delete', this.httpOptions).subscribe((res)=>{//<{access_token:  string}>
        alert('Candidato deletado com sucesso!');
        this.router.navigate(['/candidate']);

    },
    error => {
        alert('Erro ao deletar candidato');
    });
  }

}
