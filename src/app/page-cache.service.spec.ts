import { TestBed, inject } from '@angular/core/testing';

import { PageCacheService } from './page-cache.service';

describe('PageCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageCacheService]
    });
  });

  it('should ...', inject([PageCacheService], (service: PageCacheService) => {
    expect(service).toBeTruthy();
  }));
});
