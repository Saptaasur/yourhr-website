import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EducationService } from '../services/education.service'; // Adjust the import path as needed
import { UserService } from '../user.service'; // Adjust the import path
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educationForm!: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private educationService: EducationService,
    private router: Router,
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId(); // Retrieve userId from UserService

    if (!this.userId) {
      console.error('User ID is missing.');
      this.router.navigate(['/signup']);
    }

    this.educationForm = this.fb.group({
      education: this.fb.array([this.createEducationEntry()])
    });
  }

  get educationEntries(): FormArray {
    return this.educationForm.get('education') as FormArray;
  }

  createEducationEntry(): FormGroup {
    return this.fb.group({
      degree: ['', Validators.required],
      school: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      description: ['', Validators.required]
    });
  }

  addEducation(): void {
    this.educationEntries.push(this.createEducationEntry());
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      const userId = this.userService.getUserId(); // Retrieve the userId from UserService
      if (!userId) {
        this.toastr.error('User ID is missing.', 'Error');
        return;
      }

      const educationData = this.educationForm.value.education.map((entry: any) => ({
        ...entry,
        userId: userId // Include userId with each education entry
      }));

      console.log('Sending education data:', educationData); // Log the data to check if userId is present

      this.educationService.createEducation(educationData).subscribe({
        next: (response: any) => {
          this.toastr.success('Education added successfully!', 'Success');
          this.router.navigate(['/experience']);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error('Error adding education.', 'Error');
          console.error('Error adding education', error);
        }
      });
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Error');
      this.educationForm.markAllAsTouched();
    }
  }
}
