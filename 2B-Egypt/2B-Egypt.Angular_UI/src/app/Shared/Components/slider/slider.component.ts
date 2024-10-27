import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {  
  selectedImage:number =0 ;
  slides:string[]=["/img/halan.jpg","/img/facelogo.png"] 


}
