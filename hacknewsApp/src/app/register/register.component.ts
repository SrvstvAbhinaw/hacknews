import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from '../services/appservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  empid: string;
  empname: string;
  loading:Boolean = false;
  errorMsg : string;
  warning1: Boolean = false;
  warning2: Boolean = false;

  warningID = '* Please enter employee ID';
  warningName = '* Please enter employee name';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private appservice : AppserviceService,
    private router: Router,
    // private authentication : AuthService,
    // private snackBar: MatSnackBar
    ) {
      // redirect to home if already logged in
    //   if (this.authentication.currentUserValue) {
    //     this.router.navigate(['/home']);
    // }
     }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      employeeid: [null, Validators.required],
      employeename: ['', Validators.required]
  });

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // showWarning() {
  //   this.warning = true;
  // }

  onSubmit() {
    console.log(this.loginForm.value);

    // this.input = {empid: this.loginForm.value.employeeid, empname: this.loginForm.value.employeename};
    this.empid = this.loginForm.value.employeeid;
    this.empname = this.loginForm.value.employeename;
    console.log(this.empid, ' : ',this.empname);

    if(this.empid == null || this.empid == '') {
      this.submitted = false;
      this.warning1 = true;
      // alert('Please enter valid Employee ID');
    } else {
      this.warning1 = false;
    }
    if (this.empname == "") {
      this.submitted = false;
      this.warning2 = true;
    } else {
      this.warning2 = false;
    }

    if(this.empid != null && this.empname != '') {
      this.submitted = true;
    }

    if (this.loginForm.valid && this.submitted) {
      this.appservice.registerUser(this.loginForm.value).subscribe(res=>{
        console.log(res);
        this.router.navigate(['./home']);
      });
    }
  }
}
