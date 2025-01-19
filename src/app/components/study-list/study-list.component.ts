import { Component, OnInit } from '@angular/core';
import { StudyService } from '../../services/study.service'; // Correct import
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  standalone: true,  // Enable standalone component
  imports: [CommonModule, FormsModule]  // Import CommonModule for *ngFor and FormsModule for ngModel
})
export class StudyListComponent implements OnInit {
  studies$!: Observable<any[]>; // Declare studies$ as an observable
  studyName: string = '';
  studyPhase: string = '';
  sponsorName: string = '';
  studyDescription: string = '';

  constructor(
    private studyService: StudyService,
    private router: Router,
    private loggingService: LoggingService,
  ) {}

  ngOnInit(): void {
    this.studies$ = this.studyService.getStudies();  // Fetch studies on page load
    this.loggingService.logMessage('StudyListComponent initialized', 'INFO');
  }

  onSubmit(): void {
    // Create a new study object to be added
    const newStudy = {
      name: this.studyName,
      phase: this.studyPhase,
      sponsor: this.sponsorName,
      description: this.studyDescription
    };

    // Call the service method to add the study
    this.studyService.addStudy(newStudy).subscribe({
      next: (response) => {
        this.loggingService.logMessage('Study added successfully...', 'INFO');
        console.log('Study added successfully', response);
        // Refresh the studies list after successful addition
        this.studies$ = this.studyService.getStudies();  // Re-fetch studies
        // Clear the form fields
        this.studyName = '';
        this.studyPhase = '';
        this.sponsorName = '';
        this.studyDescription = '';
      },
      error: (error) => {
        this.loggingService.logMessage('Fields should not be empty...', 'ERROR');
        console.error('Error adding study:', error);
        alert('Failed to add study. Fields should not be empty.');
      }
    });
  }

  editStudy(studyId: number): void {
    this.router.navigate([`/edit-study/${studyId}`]);
  }

  deleteStudy(studyId: number): void {
    if (confirm('Are you sure you want to delete this study?')) {
      this.studyService.deleteStudy(studyId).subscribe(
        () => {
          // Handle deletion (maybe re-fetch data or remove study from array)
          this.studies$ = this.studyService.getStudies();  // Refresh list
          this.loggingService.logMessage('Study Deleted Successfully...', 'INFO');
        },
        (error) => {
          console.error('Error deleting study:', error);
        }
      );
    }
  }
  

  navigateToEditStudy(studyId: number, mode: string): void {
    this.loggingService.logMessage('Navigating to the Edit Study page...', 'INFO');
    this.router.navigate([`/edit-study/${studyId}`], { queryParams: { mode } });
  }
  
  viewStudy(studyId: number): void {
    this.router.navigate([`/edit-study/${studyId}`]);
  }
  
}
