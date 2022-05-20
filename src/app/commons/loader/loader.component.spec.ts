import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import {LoaderService} from '../../services/loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
       providers: [
          LoaderService,
          LoaderComponent
       ]
    })

     component = TestBed.inject(LoaderComponent);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
