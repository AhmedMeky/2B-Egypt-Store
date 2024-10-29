import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertismentComponent } from './advertisment.component';

describe('AdvertismentComponent', () => {
  let component: AdvertismentComponent;
  let fixture: ComponentFixture<AdvertismentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertismentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
