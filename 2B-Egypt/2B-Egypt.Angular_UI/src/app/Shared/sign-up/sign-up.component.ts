import { Component, Input } from '@angular/core';
import { IUser } from '../../../models/iuser';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  loginservice: LoginService | undefined;
  @Input() user: IUser | any = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };
  constructor(private loginService: LoginService) {
    this.loginservice = loginService;
  }
  onSubmit() { 
    // Example of ensuring phoneNumber is a string
   this.user.phoneNumber = String(this.user.phoneNumber); 
   console.log(typeof(this.user.phoneNumber))
    // Basic validation
    if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.phoneNumber || !this.user.password || !this.user.confirmPassword) {
      console.error('All fields are required');
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    console.log('User  Data:', this.user);
    this.loginService.UserRegister(this.user).subscribe(
      (response) => {
        console.log('Sign up successful', response);
      },
      (error) => {
        console.error('Sign up failed', error);
        if (error.error) {
          console.error('Error details:', error.error);
        }
      }
    );
  }
  // onSubmit() {
  //   // Here you can perform validation if needed
  //   console.log('User  Data:', this.user);
  //   this.loginservice?.UserRegister(this.user).subscribe(
  //     (response) => {
  //       console.log('Sign up successful', response);
  //     },
  //     (error) => {
  //       console.error('Sign up failed', error);
  //     }
  //   );
  // }
}
