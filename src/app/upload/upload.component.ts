import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  uploadForm: FormGroup;
  files: { [key: string]: File | null } = { 'resume': null, 'coverLetter': null };
  fileErrors: { [key: string]: string | null } = { 'resume': null, 'coverLetter': null };
  uploadSuccess: boolean = false;
  uploadError: string | null = null;

  constructor(private fb: FormBuilder, private uploadService: UploadService, private router: Router) {  // Inject Router
    this.uploadForm = this.fb.group({
      resume: [null, Validators.required],
      coverLetter: [null, Validators.required]
    });
  }

  onFileSelected(event: any, fileType: 'resume' | 'coverLetter'): void {
    const file: File = event.target.files[0];
    if (file) {
      this.files[fileType] = file;
    }
  }

  onSubmit(): void {
    if (this.uploadForm.invalid || !this.files['resume'] || !this.files['coverLetter']) {
      this.fileErrors['resume'] = !this.files['resume'] ? 'Resume is required.' : null;
      this.fileErrors['coverLetter'] = !this.files['coverLetter'] ? 'Cover letter is required.' : null;
      return;
    }

    const formData = new FormData();
    formData.append('resume', this.files['resume']);
    formData.append('coverLetter', this.files['coverLetter']);

    this.uploadService.uploadFile(formData).subscribe(
      (response) => {
        this.uploadSuccess = true;
        this.uploadError = null;
        console.log('File uploaded successfully', response);
        this.router.navigate(['/thank-you']);
      },
      (error) => {
        this.uploadSuccess = false;
        this.uploadError = 'File upload failed. Please try again.';
        console.error('Error uploading file', error);
      }
    );
  }
}
