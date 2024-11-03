import { Component, Input } from '@angular/core';
import { IUser } from '../../../models/iuser';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Observer } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule,RouterLink,TranslateModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent { 
  alreadyExists:boolean =false;
  loginservice: LoginService | undefined;
  passwordNotMatch = false
  submitted = false
  emailNotVaild=false
  passwordShort=false
  @Input() user: IUser | any = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };
  constructor(private loginService: LoginService , private router:Router) {
    this.loginservice = loginService;
  }
  onSubmit() { 
    this.submitted = true
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
      this.passwordNotMatch = true
      return;
    }else{
      this.passwordNotMatch = false
    }

    if (this.user.password.length < 8) {
      this.passwordShort = true
      return;
    }else{
      this.passwordShort = false
    }

    console.log('User  Data:', this.user);
    this.loginService.UserRegister(this.user).subscribe(
      (response) => { 
        this.emailNotVaild = false

        console.log(response);
        // sessionStorage.setItem('token', response.tokens);
        // sessionStorage.setItem('user', JSON.stringify(response.user));
        console.log('Sign up successful', response);
        this.router.navigateByUrl('products')

      },
      (error) => { 
        this.alreadyExists =true;

        console.error('Sign up failed', error);
        if (error.error) {
          this.emailNotVaild = true
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
  GotoLogin(){
    this.router.navigateByUrl(`/Login`);
  }
}
