import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class TranslationService {
  defaultLang: string = 'en';

  setDefaultLang(lang: string) {
    this.defaultLang = lang;
  }

  use(lang: string) {
    this.translateService.use(lang);
    this.defaultLang = lang;
  }

  constructor(
   
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng') || this.defaultLang;
      this.defaultLang = savedLang;
      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
    }
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
    }
  }
  instant(key: string): string {
    return this.translateService.instant(key);
  }

}