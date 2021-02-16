import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Challenge } from '../model/challenge.model';
import { AppserviceService } from '../services/appservice.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  userlogged : String = '';
  challenge: Challenge;
  tagList = ['Angular','Node','React','HTML','CSS','PowerApps','Express','MongoDB'];
  updateId = null;
  newRecord: boolean = true;
  headMsg = 'Create new Challenge !!';

  challengeForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    tag: new FormControl('')
  });

  constructor(private auth : AuthService, private service: AppserviceService,
    private router: Router,private snackBar: MatSnackBar,private route: ActivatedRoute) {
    this.userlogged = this.auth.currentUserValue.employeename;
   }

  ngOnInit() {
    this.challenge = {title:'',description:'',tag:''};
    this.challengeForm.get('title').setValue('');
    this.updateId = this.route.snapshot.paramMap.get('id');
    console.log(this.updateId);
    if(this.updateId !== null) {
      this.headMsg = 'Update the existing Challenge !!';
      this.newRecord = false;
      this.service.fetchChallengeById(this.updateId).subscribe(res => {
        this.challenge = res as Challenge;
        console.log(this.challenge);
      })
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,'Close', {
      duration: 3000
    });
  }

  onSubmit() {

    this.challenge = this.challengeForm.value;
    [this.challenge.totalvote,this.challenge.createdon,this.challenge.createdby] = [0,(new Date),this.userlogged];
    console.log(this.challenge);

    if(this.newRecord) {
      // Creating new record
      this.service.postChallenge(this.challenge).subscribe(res=>{
        console.log(res);
        this.openSnackBar('Challenge added successfully !!');
        this.router.navigate(['/home']);
    });
  
    } else {
      // Updating record
      this.service.updateChallengebyId(this.updateId,this.challenge).subscribe(res => {
        console.log(res);
        this.openSnackBar('Challenge updated successfully !!');
        this.router.navigate(['/home']);
      })
    }
    }

}
