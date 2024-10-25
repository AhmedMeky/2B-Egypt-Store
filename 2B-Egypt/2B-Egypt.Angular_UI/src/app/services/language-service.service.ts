import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {

  private language :BehaviorSubject<string>;
  constructor() { 
    this.language=new BehaviorSubject<string>('English');
  }
   

  getlanguage():Observable<string>{
    return this.language.asObservable()
  }
  cahngelanguage(newvalue:string)
  {
    this.language.next(newvalue)
  }
}
