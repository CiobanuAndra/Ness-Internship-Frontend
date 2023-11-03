import { TestBed } from '@angular/core/testing';

import { UsersProgressService } from './user-progress.service';

describe('UserProgressService', () => {
  let service: UsersProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
