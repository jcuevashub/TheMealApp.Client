import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, first } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { UserModel } from '../../shared/models/user.model';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  hasError!: boolean;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = []; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;

    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        fullname: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), 
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  submit() {
    this.hasError = false;
    const result: {
      [key: string]: string;
    } = {};
    Object.keys(this.f).forEach((key) => {
      result[key] = this.f[key].value;
    });
    const newUser = new UserModel();
    newUser.setUser(result);
    const registrationSubscr = this.authService
      .registration(newUser)
      .pipe(first())
      .subscribe((user: UserModel) => {
        if (user) {
          this.router.navigate(['/']);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

