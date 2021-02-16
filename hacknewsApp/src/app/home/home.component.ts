import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Challenge } from '../model/challenge.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  challengelist : Array<any> = [];
  userHistory : any;
  list = [];
  flag : Boolean = false;


    /** Based on the screen size, switch from standard to one column per row */
    cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: 'Card 1', cols: 1, rows: 1 },
            { title: 'Card 2', cols: 1, rows: 1 },
            { title: 'Card 3', cols: 1, rows: 1 },
            { title: 'Card 4', cols: 1, rows: 1 }
          ];
        }
  
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 2 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      })
    );
    
  
  // images = [
  //   ' ../../assets/Images/Hackathon-blog-01.jpg',
  //   '../../assets/Images/banking-innovation-hackathon-life.png',
  //   '../../assets/Images/hackathon.png',
  //   '../../assets/Images/Y4PT-Transport-Hackathon-Banner.png'
  // ]

  imageObject: Array<object> = [{
    image: '../../assets/Images/image1.png',
    thumbImage: '../../assets/Images/image1.png',
    alt: 'alt of image'
}, {
    image: '../../assets/Images/image2.png', // Support base64 image
    thumbImage: '../../assets/Images/image2.png', // Support base64 image
    alt: 'Click here to view' //Optional: You can use this key if want to show image with alt
},
  {
    image: '../../assets/Images/image3.jpg', // Support base64 image
    thumbImage: '../../assets/Images/image3.jpg', // Support base64 image
    alt: 'Click here to view' //Optional: You can use this key if want to show image with alt
  },
  {
    image: '../../assets/Images/image4.png', // Support base64 image
    thumbImage: '../../assets/Images/image4.png', // Support base64 image
    alt: 'Click here to view' //Optional: You can use this key if want to show image with alt
  },
  {
    image: '../../assets/Images/image5.webp', // Support base64 image
    thumbImage: '../../assets/Images/image5.webp', // Support base64 image
    alt: 'Click here to view' //Optional: You can use this key if want to show image with alt
  },
  {
    image: '../../assets/Images/image6.jpg', // Support base64 image
    thumbImage: '../../assets/Images/image6.jpg', // Support base64 image
    alt: 'Click here to view' //Optional: You can use this key if want to show image with alt
  }
];

  constructor(private appservice : AppserviceService,private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.appservice.fetchChallenges().subscribe(data => {
      this.challengelist = data as any;
      console.log(this.challengelist);
    });

    this.appservice.fetchUserById(this.auth.currentUserValue.employeeid).subscribe(res=>{
      this.userHistory = res;
      console.log(this.userHistory);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,'Close', {
      duration: 3000
    });
  }

  thisChallenge(challenge,action){
    if(action === 'edit') {
      this.router.navigate(['/challenge/',challenge.id]);
    } 
    else if(action === 'delete') {
      this.appservice.deleteChallengebyId(challenge.id).subscribe(res=>{
        console.log(res);
        this.openSnackBar('Challenge deleted successfully !!');
        location.reload();
      });
    }
  }

  poll(challenge){
    challenge.totalvote = challenge.totalvote + 1; 
    this.appservice.poll(challenge.id,this.auth.currentUserValue.employeeid,challenge).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    });
  }

  sortbyvotesA(){
    this.challengelist.sort((a,b)=> {
      return a.totalvote >b.totalvote?1:a.totalvote <b.totalvote?-1:0
    })
  }
  sortbyvotesD(){
    this.challengelist.sort((a,b)=> {
      return a.totalvote >b.totalvote?-1:a.totalvote <b.totalvote?1:0
    })
  }
  sortbydateA(){
    this.challengelist.sort((a,b)=> {
      return a.createdon >b.createdon?1:a.createdon <b.createdon?-1:0
    })
  }
  sortbydateD(){
    this.challengelist.sort((a,b)=> {
      return a.createdon >b.createdon?-1:a.createdon <b.createdon?1:0
    })
  }

}

// this.appservice.updateChallengebyId(challenge.id,challenge).subscribe(res => {
//   console.log(res)