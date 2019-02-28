import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GLOBAL } from '../../../../global';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: any;
  public password: any;
  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    localStorage.setItem('userToken', JSON.stringify({
        id: 1,
        username: "claudinei",
        password: "123456",
        firstName: "Claudinei",
        lastName: "de Lima"
    }));

    this.router.navigate(['/']);



    this.http.post(GLOBAL.url+'login',{
      username: this.username,
      password: this.password
    }).subscribe((res)=>{
      if(res["status"] == 201){
        localStorage.setItem('userToken', res["access_token"]);
        this.router.navigate(['/']);
      }
      this.router.navigate(['/login']);

    },
    error => {
        this.error = error;
        this.loading = false;
        alert('Erro ao fazer login');
    });
  }

}