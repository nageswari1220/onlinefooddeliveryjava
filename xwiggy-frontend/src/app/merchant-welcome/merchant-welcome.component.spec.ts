import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantWelcomeComponent } from './merchant-welcome.component';

describe('MerchantWelcomeComponent', () => {
  let component: MerchantWelcomeComponent;
  let fixture: ComponentFixture<MerchantWelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantWelcomeComponent]
    });
    fixture = TestBed.createComponent(MerchantWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
