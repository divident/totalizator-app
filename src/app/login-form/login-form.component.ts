import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms'

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
  registerForm: FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createForm()
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
      res => console.log(res),
      err => console.log('Error ' + err)
    )
  }
}
