import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingReviewPaymentComponent } from './shipping-review-payment.component';

describe('ShippingReviewPaymentComponent', () => {
  let component: ShippingReviewPaymentComponent;
  let fixture: ComponentFixture<ShippingReviewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingReviewPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingReviewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
