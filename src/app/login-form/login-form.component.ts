import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms'
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LeBbHwUAAAAAAl7FUKRvrJGvZJF-2JY_r4cZ2SW' } as RecaptchaSettings,
    },
  ],
})
export class LoginFormComponent implements OnInit {
  registerForm: FormGroup;
  subscription: Subscription;
  username: string;
  user = {username: '', password: '', remember: false};

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.createForm()
    this.subscription = this.authService.getUsername().subscribe(name => {console.log(name); this.username=name})
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      captcha_token: new FormControl(null, Validators.required)
    },
    {
      validator: this.checkPasswords
    })
    
  }

  checkPasswords(group: FormGroup) { 
    let pass = group.controls.password1.value;
    let confirmPass = group.controls.password2.value;

    return pass === confirmPass ? null : { notSame: true }     
}

  onSubmit() {
    console.log(this.registerForm.value)
    this.authService.registerUser(this.registerForm).subscribe(
      res => {
        console.log(res)
        this.user.password = this.registerForm.value.password1
        this.user.username = this.registerForm.value.username
        this.authService.logIn(this.user).subscribe(usr => {
          console.log('Login as ' + usr)
          this.router.navigate([''])  
        })
      },
      err => console.log("Error " + err)
    )
  }

  login() {
    console.log(this.user)
    this.authService.logIn(this.user).subscribe(
      res => {
        console.log(res),
        this.router.navigate([''])
      },
      err => console.log("Error " + err)
    )
  }
}
