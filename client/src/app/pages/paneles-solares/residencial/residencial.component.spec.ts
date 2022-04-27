import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencialComponent } from './residencial.component';

describe('ResidencialComponent', () => {
  let component: ResidencialComponent;
  let fixture: ComponentFixture<ResidencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
