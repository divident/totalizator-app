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

  formErrors = {
    'username': '',
    'password1': '',
    'password2': '',
    'captcha_token': ''
  }

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
    this.registerForm.valueChanges.subscribe(data => this.onValueChanges(data))
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
      err => {
        console.log("Error " + err)
        if(err.status==400) {
          this.showErrorMessages(err.error)
        }
      }
    )
  }

  login() {
    console.log(this.user)
    this.authService.logIn(this.user).subscribe(
      res => {
        console.log(res),
        this.router.navigate([''])
      },
      err => console.log("Error " + JSON.stringify(err))
    )
  }

  showErrorMessages(error: {string: Array<string>}) {
    for(let [key, value] of Object.entries(error)){
      if(key in this.formErrors) {
        this.formErrors[key] += value + " " 
      }
    }
    console.log("Errors from server " + JSON.stringify(this.formErrors))
  }

  onValueChanges(data?: any) {
    if(!this.registerForm) { return; }
    const form = this.registerForm;
    if (this.registerForm.hasError('notSame')) {
      let field = "password2"
      const control = form.get([field]);
      this.formErrors[field] = control.errors
    }
    for(const field in this.formErrors) {
      this.formErrors[field] = ''
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        for(const key in control.errors) {
          console.log("Error key " + key)
          this.formErrors[field] = control.errors
        }
      }
    }
  }
}
