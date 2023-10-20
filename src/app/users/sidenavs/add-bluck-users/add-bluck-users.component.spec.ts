import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBluckUsersComponent } from './add-bluck-users.component';

describe('AddBluckUsersComponent', () => {
  let component: AddBluckUsersComponent;
  let fixture: ComponentFixture<AddBluckUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBluckUsersComponent]
    });
    fixture = TestBed.createComponent(AddBluckUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
