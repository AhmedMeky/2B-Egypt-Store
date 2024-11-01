import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Loginuser } from '../../../models/loginuser';
import { firstValueFrom } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrected from styleUrl to styleUrls
})
export class LoginComponent implements OnInit {
  @Input() loginuser: Loginuser = {
    email: '',
    password: '',
  };
  loading: boolean = false;
  isLoggedIn: boolean = false; // Track login status

  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit() {
    // Check if the user is logged in when the component initializes
    this.isLoggedIn = !!sessionStorage.getItem('token'); // Check for token in session storage
  }

//  async onSubmit(event: Event) {
//     event.preventDefault();
//     console.log(this.loginuser);

//    await this.authService.login(this.loginuser).subscribe({
//       next: (response) => {
//         console.log(response);
//         sessionStorage.setItem('token', response.tokens);
//         sessionStorage.setItem('user', JSON.stringify(response.user)); // Save user details
//         this.isLoggedIn = true; // Set login status to true
//         this.router.navigate(['/products']); // Navigate to the home page or another page on successful login
//       },
//       error: (err) => {
//         console.error('Login failed', err);
//       },
//     });
//   }
async onSubmit(event: Event) {
  event.preventDefault();
  console.log(this.loginuser);
  this.loading = true;
  try {
    const response = await firstValueFrom(this.authService.login(this.loginuser)); // Await the login response
    console.log(response);
    sessionStorage.setItem('token', response.tokens);
    sessionStorage.setItem('user', JSON.stringify(response.user)); // Save user details
    this.isLoggedIn = true; // Set login status to true
    console.log(this.isLoggedIn);
    this.router.navigate(['/products']); // Navigate to the home page or another page on successful login
  } catch (err) {
    console.error('Login failed', err);
    // Optionally, display an error message to the user 
    this.isLoggedIn = false;
  } 
  finally{
    this.isLoggedIn =false ;
  }
} 
changeStat(){
  this.isLoggedIn =!this.isLoggedIn ; 
  alert(this.isLoggedIn) ;
}

  logOut() {
    sessionStorage.removeItem('token'); // Clear the token
    sessionStorage.removeItem('user'); // Clear user details
    this.isLoggedIn = false; // Update login status
    this.router.navigate(['/login']); // Navigate to the login page 
    console.log(this.isLoggedIn) ;
  } 
  checkLoginStatus() {
    const token = sessionStorage.getItem('token');
    this.isLoggedIn = !!token; // Set isLoggedIn based on the presence of the token
  }
}