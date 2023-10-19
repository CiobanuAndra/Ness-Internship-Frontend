import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbulkusersComponent } from './addbulkusers.component';

describe('AddbulkusersComponent', () => {
  let component: AddbulkusersComponent;
  let fixture: ComponentFixture<AddbulkusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddbulkusersComponent]
    });
    fixture = TestBed.createComponent(AddbulkusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
