import { Injectable } from '@angular/core';

@Injectable()
export class PageCacheService {

  private pageCaches: Map<string, any> = new Map();

  constructor() { }

  put(cacheKey: string, cache: any): void {
    this.pageCaches.set(cacheKey, cache);
  }

  get(cacheKey: string): any {
    return this.pageCaches.get(cacheKey);
  }

  remove(cacheKey: string): any {
    this.pageCaches.delete(cacheKey);
  }
}
