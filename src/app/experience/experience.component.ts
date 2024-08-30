// experience.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperienceService } from '../services/experience.service';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experienceForm!: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private experienceService: ExperienceService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();

    if (!this.userId) {
      console.error('User ID is missing.');
      this.router.navigate(['/signup']);
    }

    this.experienceForm = this.fb.group({
      experiences: this.fb.array([this.createExperienceEntry()])
    });
  }

  get experienceEntries(): FormArray {
    return this.experienceForm.get('experiences') as FormArray;
  }

  createExperienceEntry(): FormGroup {
    return this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['', Validators.required]
    });
  }

  addExperience(): void {
    this.experienceEntries.push(this.createExperienceEntry());
  }

  onSubmit(): void {
    if (this.experienceEntries.length === 0 || this.experienceForm.valid) {
      const userId = this.userService.getUserId();
      if (!userId) {
        this.toastr.error('User ID is missing.', 'Error');
        return;
      }

      const experienceData = this.experienceForm.value.experiences.map((entry: any) => ({
        ...entry,
        userId: userId
      }));

      console.log('Sending experience data:', experienceData);

      this.experienceService.createExperience(experienceData).subscribe({
        next: (response: any) => {
          this.toastr.success('Experience added successfully!', 'Success');
          this.router.navigate(['/upload']);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error('Error adding experience.', 'Error');
          console.error('Error adding experience', error);
        }
      });
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Error');
      this.experienceForm.markAllAsTouched();
    }
  }
}
