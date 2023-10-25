import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbulkuserTableComponent } from './addbulkuser-table.component';

describe('AddbulkuserTableComponent', () => {
  let component: AddbulkuserTableComponent;
  let fixture: ComponentFixture<AddbulkuserTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddbulkuserTableComponent]
    });
    fixture = TestBed.createComponent(AddbulkuserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
