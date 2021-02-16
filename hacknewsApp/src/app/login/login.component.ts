import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  input: String;
  loading:Boolean = false;
  errorMsg : string;
  warning: Boolean = false;

  warningMsg = '* Please enter employee ID';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authentication : AuthService,
    private snackBar: MatSnackBar
    ) {
      // redirect to home if already logged in
      if (this.authentication.currentUserValue) {
        this.router.navigate(['/home']);
    }
     }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      employeeid: [null, Validators.required]
  });

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,'Close', {
      duration: 3000
    });
  }

  // showWarning() {
  //   this.warning = true;
  // }

  onSubmit() {
    console.log(this.loginForm.value);

    this.input = this.loginForm.value.employeeid;
    console.log(this.input);

    if(this.input == null || this.input.trim().length == 0) {
      this.submitted = false;
      this.warning = true;
      // alert('Please enter valid Employee ID');
    } 
     else {
       this.warning = false;
      this.submitted = true;
    }

    if (this.loginForm.valid && this.submitted) {
          this.authentication.login(this.loginForm.controls.employeeid.value).subscribe(
              data => {
              console.log(data);
                this.loading = false;
                console.log('Navigating ...');
                this.router.navigate([this.returnUrl]);
                location.reload();
            }, err => {
              this.loading = true;
              this.errorMsg = err.error.message;
              console.log(this.errorMsg);
              // this.openSnackBar(this.errorMsg);
              alert(this.errorMsg);
              location.reload();
            });
    }

}


}
