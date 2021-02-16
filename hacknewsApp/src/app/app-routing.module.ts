import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengeComponent } from './challenge/challenge.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path : 'home', component : HomeComponent, canActivate: [AuthGuard]},
  {path : 'login', component: LoginComponent},
  {path : 'register', component: RegisterComponent},
  {path: 'challenge', component: ChallengeComponent, canActivate: [AuthGuard]},
  {path: 'challenge/:id', component: ChallengeComponent, canActivate: [AuthGuard]},
  {path : '**' , redirectTo : 'home', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
