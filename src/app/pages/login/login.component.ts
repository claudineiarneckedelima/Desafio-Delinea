import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../../../../global';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private httpOptions: any;
  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    //private router: Router
  ) { }

  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(){//: Observable<any>
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    const dataVars = GLOBAL.client_id+"&"+
    GLOBAL.client_secret+"&"+GLOBAL.grant_type+
    "&username="+this.loginForm.get('username').value+
    "&password="+this.loginForm.get('password').value+
    "&undefined=";

    this.http.post(GLOBAL.url+'o/token/', dataVars, this.httpOptions).subscribe((res)=>{
      localStorage.setItem('userToken', res["access_token"]);
      window.location.href='/dashboard';
    },
    error => {
      //this.error = error;
      this.loading = false;
      alert('Login e senha não conferem');
    });
  }

}
