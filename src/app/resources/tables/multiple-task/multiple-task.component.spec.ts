import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleTaskComponent } from './multiple-task.component';

describe('MultipleTaskComponent', () => {
  let component: MultipleTaskComponent;
  let fixture: ComponentFixture<MultipleTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleTaskComponent]
    });
    fixture = TestBed.createComponent(MultipleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
