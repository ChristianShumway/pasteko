import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarHelpComponent } from './avatar-help.component';

describe('AvatarHelpComponent', () => {
  let component: AvatarHelpComponent;
  let fixture: ComponentFixture<AvatarHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
