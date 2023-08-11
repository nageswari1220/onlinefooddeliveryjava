import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantMenuComponent } from './merchant-menu.component';

describe('MerchantMenuComponent', () => {
  let component: MerchantMenuComponent;
  let fixture: ComponentFixture<MerchantMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantMenuComponent]
    });
    fixture = TestBed.createComponent(MerchantMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
