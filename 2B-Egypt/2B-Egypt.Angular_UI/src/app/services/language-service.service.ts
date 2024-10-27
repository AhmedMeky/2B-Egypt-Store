import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {
  currentLang: string = 'en';
  private language :BehaviorSubject<string>;
  constructor() { 
    this.language=new BehaviorSubject<string>('en');
  }
  getlanguage():Observable<string>{
    return this.language.asObservable()
  }
  cahngelanguage(newvalue:string)
  {
    this.language.next(newvalue)
  }
  setLanguage(lang: string): void {
    this.currentLang = lang;
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
   
}

}

