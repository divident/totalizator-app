import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProcessHttpMsgService } from '../services/process-httpmsg.service';
import { ErrorsHandler } from '../errors-handler';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LeBbHwUAAAAAAl7FUKRvrJGvZJF-2JY_r4cZ2SW' } as RecaptchaSettings,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }
  ],
})
export class LoginFormComponent implements OnInit {
  registerForm: FormGroup;
  subscription: Subscription;
  username: string;
  user = { username: '', password: '', remember: false };

  formErrors = {
    'username': '',
    'password1': '',
    'password2': '',
    'captcha_token': ''
  }

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private errorMsg: ProcessHttpMsgService) { }

  ngOnInit() {
    this.createForm()
    this.subscription = this.authService.getUsername().subscribe(
      name => { this.username = name },
    )
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      captcha_token: new FormControl(null, Validators.required)
    },
      {
        validator: this.checkPasswords
      })
  }

  checkPasswords(group: FormGroup) {
    let pass1 = group.get("password1").value
    let pass2 = group.get("password2").value
    if (pass1 === pass2) {
      return null;
    } else {
      group.get("password2").setErrors({"errors": true })
    }
  }

  onSubmit() {
    this.authService.registerUser(this.registerForm).subscribe(
      res => {
        this.user.password = this.registerForm.value.password1
        this.user.username = this.registerForm.value.username
        this.authService.logIn(this.user).subscribe(usr => {
          this.router.navigate([''])
        })
      },
    )
  }

  login() {
    this.authService.logIn(this.user).subscribe(
      res => {
          this.router.navigate([''])
      },
      error => {
        this.errorMsg.handleError("Niepoprawne hasło lub nazwa użytkownika")
      }

    )
  }

  showErrorMessages(error: { string: Array<string> }) {
    for (let [key, value] of Object.entries(error)) {
      if (key in this.formErrors) {
        this.formErrors[key] += value + " "
      }
    }
  }
}
