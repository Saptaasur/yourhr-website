import { Component, OnInit } from '@angular/core'; // Import OnInit for initialization
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignUpService } from '../services/sign-up.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit { // Implement OnInit
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private signUpService: SignUpService,
    private userService: UserService // Inject UserService
  ) {
    // Initialize the form in the constructor
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Any additional initialization logic if needed
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.signUpService.signUpUser(this.signupForm.value).subscribe(
        response => {
          this.toastr.success('Signup successful!', 'Success');
          const userId = response.userId;
          this.userService.setUserId(userId); // Store userId
          this.router.navigate(['/education']);
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Signup failed. Please try again.', 'Error');
          console.error('Signup error:', error.message);
        }
      );
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Error');
      this.signupForm.markAllAsTouched();
    }
  }
}
