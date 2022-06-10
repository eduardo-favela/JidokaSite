import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasosExitoAutomComponent } from './casos-exito-autom.component';

describe('CasosExitoAutomComponent', () => {
  let component: CasosExitoAutomComponent;
  let fixture: ComponentFixture<CasosExitoAutomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasosExitoAutomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasosExitoAutomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
