import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyService } from '../../services/study.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EditSubjectComponent implements OnInit {
  subjectId: number = 0;
  subject: any = { subject_name: '', age: null, gender: '' };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private studyService: StudyService,
    public router: Router,
    private loggingService: LoggingService,

  ) {}

  ngOnInit(): void {
    // Get the subjectId from the route parameters
    const subjectIdParam = this.route.snapshot.paramMap.get('subjectId');
    this.loggingService.logMessage('EditStudyComponent initialized', 'INFO');
    if (subjectIdParam) {
      this.subjectId = +subjectIdParam;  // Convert to number
      this.loadSubjectDetails(this.subjectId);  // Load subject details
    }
  }

  // Load subject details based on subjectId
  loadSubjectDetails(subjectId: number): void {
    this.studyService.getSubjectById(subjectId).subscribe(
      (data) => {
        this.subject = data;  // Store subject data
      },
      (error) => {
        console.error('Error loading subject details:', error);
        this.errorMessage = 'Failed to load subject details.';
      }
    );
  }

  saveSubject(): void {
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    if (subjectId) {
      this.studyService.updateSubject(+subjectId, this.subject).subscribe(
        () => {
          const studyId = this.subject.study; // Extract the study ID from the updated subject object
          this.loggingService.logMessage('Subject updatted successfully', 'INFO');
          alert('Subject updated successfully!');
          this.router.navigate([`/edit-study/${studyId}`], { queryParams: { mode: 'view' } });
        },
        (error) => {
          alert('Failed to update subject. Fields should not be empty.');
          console.error('Error updating subject:', error);
          this.loggingService.logMessage('Field is empty', 'ERROR');
          this.errorMessage = 'Failed to update subject.';
        }
      );
    }
  }
  

  // Navigate back to the Edit Study page
  navigateBackToStudy(subject: any): void {
    if (subject.study) {
      const studyId = subject.study;  // Get the study ID associated with the subject
      this.loggingService.logMessage('Navigating to Edit Study page', 'INFO');
      this.router.navigate([`/edit-study/${studyId}`], { queryParams: { mode: 'view' } });
    } else {
      console.error('Study ID not found in subject.');
    }
  }
}
