import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlingJobsComponent } from './handling-jobs.component';

describe('HandlingJobsComponent', () => {
  let component: HandlingJobsComponent;
  let fixture: ComponentFixture<HandlingJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandlingJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
