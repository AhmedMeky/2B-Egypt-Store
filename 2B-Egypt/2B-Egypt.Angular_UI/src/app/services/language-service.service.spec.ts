import { TestBed } from '@angular/core/testing';

import { LanguageServiceService } from './language-service.service';

describe('LanguageServiceService', () => {
  let service: LanguageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
