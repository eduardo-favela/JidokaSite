import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColectorSolarComponent } from './colector-solar.component';

describe('ColectorSolarComponent', () => {
  let component: ColectorSolarComponent;
  let fixture: ComponentFixture<ColectorSolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColectorSolarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColectorSolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
