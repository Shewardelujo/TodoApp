import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteDetailComponent } from './complete-detail.component';

describe('CompleteDetailComponent', () => {
  let component: CompleteDetailComponent;
  let fixture: ComponentFixture<CompleteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
