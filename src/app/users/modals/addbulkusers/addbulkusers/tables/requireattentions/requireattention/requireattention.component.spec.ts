import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireattentionComponent } from './requireattention.component';

describe('RequireattentionComponent', () => {
  let component: RequireattentionComponent;
  let fixture: ComponentFixture<RequireattentionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequireattentionComponent]
    });
    fixture = TestBed.createComponent(RequireattentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
