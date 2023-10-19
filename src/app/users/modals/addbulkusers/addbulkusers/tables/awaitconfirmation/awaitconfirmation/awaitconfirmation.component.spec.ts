import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitconfirmationComponent } from './awaitconfirmation.component';

describe('AwaitconfirmationComponent', () => {
  let component: AwaitconfirmationComponent;
  let fixture: ComponentFixture<AwaitconfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwaitconfirmationComponent]
    });
    fixture = TestBed.createComponent(AwaitconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
