import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Loginuser } from '../../../models/loginuser';
import { firstValueFrom } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrected from styleUrl to styleUrls
})
export class LoginComponent implements OnInit {
  @Input() loginuser: Loginuser = {
    email: '',
    password: '',
  };

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

  try {
    const response = await firstValueFrom(this.authService.login(this.loginuser)); // Await the login response
    console.log(response);
    sessionStorage.setItem('token', response.tokens);
    sessionStorage.setItem('user', JSON.stringify(response.user)); // Save user details
    this.isLoggedIn = true; // Set login status to true
    this.router.navigateByUrl('products').then(() => {
      window.location.reload();
    });

    // this.router.navigate(['/products']); // Navigate to the home page or another page on successful login
  } catch (err) {
    console.error('Login failed', err);
    // Optionally, display an error message to the user
  }
}

  logOut() {
    sessionStorage.removeItem('token'); // Clear the token
    sessionStorage.removeItem('user'); // Clear user details
    this.isLoggedIn = false; // Update login status
    this.router.navigate(['/login']); // Navigate to the login page
  }
}