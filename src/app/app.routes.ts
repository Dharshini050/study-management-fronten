import { Routes } from '@angular/router';
import { StudyListComponent } from './components/study-list/study-list.component';
import { EditStudyComponent } from './components/edit-study/edit-study.component';
import { EditSubjectComponent } from './components/edit-subject/edit-subject.component';

export const routes: Routes = [
  { path: '', component: StudyListComponent }, // Default route
  { path: 'edit-study/:id', component: EditStudyComponent },
  { path: 'edit-subject/:subjectId', component: EditSubjectComponent },  // New route for editing subject
  
  ];
