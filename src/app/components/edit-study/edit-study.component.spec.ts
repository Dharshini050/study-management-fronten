import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudyComponent } from './edit-study.component';

describe('EditStudyComponent', () => {
  let component: EditStudyComponent;
  let fixture: ComponentFixture<EditStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStudyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
