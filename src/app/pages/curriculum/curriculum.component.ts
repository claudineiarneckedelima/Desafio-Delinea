import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../../../global';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {
  curriculumForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.curriculumForm = this.formBuilder.group({
        username: ['', Validators.required],
        confirm_username: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        cpf: ['', Validators.required],
        rg: ['', Validators.required],
        birth: ['', Validators.required],
        lattes: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.curriculumForm.controls; }

  onSubmit(){
    this.submitted = true;

    if (this.curriculumForm.invalid) {
        return;
    }

    if(this.curriculumForm.get('username').value !== this.curriculumForm.get('confirm_username').value){
      alert('Nomes de usuário não conferem');
      return
    }

    this.loading = true;

    let curriculum = {
      //"password": "pbkdf2_sha256$20000$owRR1UJPwfoC$Q0OEA5wN/80Xht+sSJU+2e6jRgSiqQMoSC1anQp8lCc=",
      //"last_login": null,
      //"is_superuser": false,
      "full_name": this.curriculumForm.get('firstname').value+' '+this.curriculumForm.get('lastname').value,
      "first_name": this.curriculumForm.get('firstname').value,
      "last_name": this.curriculumForm.get('lastname').value,
      "email": this.curriculumForm.get('email').value,
      //"is_staff": false,
      //"is_active": true,
      //"date_joined": "2017-04-13T19:03:16.975640Z",
      "username": this.curriculumForm.get('username').value,
      //"confirm_username": false,
      //"is_social": false,
      "phone": this.curriculumForm.get('phone').value,
      //"publisher": false,
      //"name": null,
      "cpf": this.curriculumForm.get('cpf').value,
      "rg": this.curriculumForm.get('rg').value,
      "birth_date": this.curriculumForm.get('birth').value,
      "lattes": this.curriculumForm.get('lattes').value
    };

    localStorage.setItem('curriculum', JSON.stringify(curriculum));

    /*this.http.post(GLOBAL.url+'candidate', curriculum).subscribe((res)=>{
        if(res["status"] == 201){
          alert('Currículo cadastrado com sucesso!');
          this.router.navigate(['/curriculum-print']);
        }
        else
          alert('Currículo não cadastrado!');
    },
    error => {
        alert('Erro ao enviar currículo');
    });*/
  }

}
