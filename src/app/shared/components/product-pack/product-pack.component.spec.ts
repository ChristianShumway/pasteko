import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPackComponent } from './product-pack.component';

describe('ProductPackComponent', () => {
  let component: ProductPackComponent;
  let fixture: ComponentFixture<ProductPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
