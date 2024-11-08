import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule,RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentLang: string="";

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.currentLang = this.translateService.currentLang || 'en'; 
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.currentLang = lang;
  }

}
