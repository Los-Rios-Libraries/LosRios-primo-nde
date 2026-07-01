import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';

@Component({
  selector: 'custom-problem-reporter-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule
  ],
  templateUrl: './problem-reporter-dialog.component.html',
  styleUrl: './problem-reporter-dialog.component.css'
})
export class ProblemReporterDialogComponent {
  private dialogRef = inject(MatDialogRef<ProblemReporterDialogComponent>);
  private data = inject(MAT_DIALOG_DATA); 
  private fb = inject(FormBuilder);
  
  // UI State tracking
  public isSubmitting = false;
  public isSuccess = false;
  public errorMessage = '';

  public reportForm = this.fb.nonNullable.group({
    email: ['', { validators: [Validators.email], updateOn: 'blur' }],
    description: ['', [Validators.required]],
    email2: [''] 
  });

  // Changed to async function to use await with fetch
  async submitReport(): Promise<void> {
    if (this.reportForm.invalid) return;

    // Reset error state on new attempt
    this.errorMessage = '';

    // Honeypot check (silently pretend it was successful)
    if (this.reportForm.controls.email2.value !== '') {
      this.showSuccessAndClose();
      return;
    }

    this.isSubmitting = true;

    const payload = {
      ...this.data, 
      email: this.reportForm.controls.email.value,
      description: this.reportForm.controls.description.value
    };

    const libOWUrl = 'https://na-workflows.hosted.exlibrisgroup.com/60d0c170-306f-43b5-a6a4-a9d81bda2fc4/webhook/7cbb96b2-4df9-4a90-958a-0040d35c70d1';

    try {
      // Use the native fetch API
      const response = await fetch(libOWUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // fetch only rejects on network failure, so we must manually check if the response was successful (e.g. 200 OK)
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Success
      this.isSubmitting = false;
      this.showSuccessAndClose();

    } catch (err) {
      console.error('Submission failed', err);
      this.isSubmitting = false;
      this.errorMessage = `There was an error submitting your report. Please try again or <a href="https://library.losrios.edu/ask-us/${VIEW_CONSTANTS.libraryAcronym}">contact the library directly</a>.`;
    }
  }

  // Helper method to show the success message, wait 2.5 seconds, then close
  private showSuccessAndClose(): void {
    this.isSuccess = true;
    setTimeout(() => {
      this.dialogRef.close({ success: true });
    }, 2500); // 2500 milliseconds = 2.5 seconds
  }
}