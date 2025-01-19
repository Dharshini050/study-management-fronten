import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyService } from '../../services/study.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-edit-study',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-study.component.html',
})
export class EditStudyComponent implements OnInit {
  studyId: number = 0;
  study: any = { name: '', description: '', phase: '', sponsor: '' };
  subjects: any[] = [];
  subjectForm = { subject_name: '', age: null, gender: '' };
  errorMessage = '';

  constructor(
    private studyService: StudyService,
    private route: ActivatedRoute,
    private router: Router,
    private loggingService: LoggingService

  ) {}

  ngOnInit(): void {
    this.loggingService.logMessage('EditStudyComponent Initiated', 'INFO');
    const studyId = this.route.snapshot.paramMap.get('id');
    if (studyId) {
      this.studyId = +studyId;
      this.loadStudy(this.studyId);
      this.loadStudyDetails(this.studyId);
      this.loadSubjects(this.studyId)
    }
  }

  loadStudy(id: number): void {
    this.studyService.getStudies().subscribe(
      (data) => {
        const foundStudy = data.find((study: any) => study.id === id);
        if (foundStudy) {
          this.study = foundStudy;
        }
      },
      (error) => console.error('Error loading study:', error)
    );
  }

  loadSubjects(studyId: number): void {
    this.studyService.getSubjects(studyId).subscribe(
      (data) => (this.subjects = data),
      (error) => console.error('Error loading subjects:', error)
    );
  }

  saveStudy(): void {
    const studyId = this.route.snapshot.paramMap.get('id');
    if (studyId) {
      this.studyService.updateStudy(+studyId, this.study).subscribe(
        () => {
          alert('Study updated successfully!');
          this.loggingService.logMessage('Study updated', 'INFO');
          this.router.navigate(['/']);
        },
        (error) => {
          this.loggingService.logMessage('Study field is empty ', 'ERROR');
          alert('Failed to update study. Fields should not be empty.');
          console.error('Error updating study:', error)
        } 
      );
    }
  }

  loadStudyDetails(studyId: number): void {
    this.studyService.getStudyWithSubjects(studyId).subscribe(
      (data) => {
        this.study = data;
        this.loggingService.logMessage('Loaded study ', 'INFO');
        console.log('Loaded study:', this.study);  // Check the structure of the returned data
      },
      (error) => {
        console.error('Error loading study details:', error);
        this.errorMessage = 'Failed to load study details.';
      }
    );
  }
  
  addSubject(): void {
    const newSubject = { 
      study: this.studyId, 
      ...this.subjectForm 
    };
  
    console.log('Adding subject:', newSubject);
  
    this.studyService.addSubject(newSubject).subscribe({
      next: (response) => {
        this.loggingService.logMessage('Subject added successfully ', 'INFO');
        console.log('Subject added successfully:', response);
        // Reload the entire study data, including subjects, after the subject is added
        this.studyService.getStudyWithSubjects(this.studyId).subscribe({
          next: (studyData) => {
            this.study = studyData;  // Update the study data with new subjects
          },
          error: (error) => {
            console.error('Error reloading study data:', error);
            this.errorMessage = 'Failed to reload study data.';
          }
        });
        // Clear the form fields
        this.resetForm();
      },
      error: (error) => {
        this.loggingService.logMessage('Subject Field is empty ', 'ERROR');
        alert('Failed to add subject. Fields should not be empty.');
        console.error('Error adding subject:', error);
        this.errorMessage = 'Failed to add subject.';
      }
    });
  }
  
  deleteSubject(subjectId: number): void {
    this.loggingService.logMessage('Deleting subject ', 'INFO');
    console.log('Deleting subject:', subjectId);
    if (confirm('Are you sure you want to delete this study?'))
    this.studyService.deleteSubject(subjectId).subscribe({
      next: (response) => {
        console.log('Subject added successfully:', response);
        // Reload the entire study data, including subjects, after the subject is added
        this.studyService.getStudyWithSubjects(this.studyId).subscribe({
          next: (studyData) => {
            this.study = studyData;  // Update the study data with new subjects
          },
          error: (error) => {
            console.error('Error reloading study data:', error);
            this.errorMessage = 'Failed to reload study data.';
          }
        });
      },
      error: (error) => {
        console.error('Error deleting subject:', error);
        this.errorMessage = 'Failed to delete subject.';
      }
    });
  }

  editSubject(subjectId: number): void {
    this.loggingService.logMessage('Navigating to edit subject page ', 'INFO');
    this.router.navigate([`/edit-subject/${subjectId}`]);  // Pass the subject ID to the edit-subject route
  }
  // Navigate back to the main Study page
  navigateToMainPage(): void {
    this.loggingService.logMessage('Navigating to main page ', 'INFO');
    this.router.navigate(['/']); // Navigate to the root URL
  }
  
  resetForm(): void {
    this.subjectForm = { subject_name: '', age: null, gender: '' };
    this.errorMessage = '';
  }
}
