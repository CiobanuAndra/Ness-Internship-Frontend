import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgressTableComponent } from './user-progress-table.component';

describe('UserProgressTableComponent', () => {
  let component: UserProgressTableComponent;
  let fixture: ComponentFixture<UserProgressTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProgressTableComponent]
    });
    fixture = TestBed.createComponent(UserProgressTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
