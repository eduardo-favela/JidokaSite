import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatizacionComponent } from './automatizacion.component';

describe('AutomatizacionComponent', () => {
  let component: AutomatizacionComponent;
  let fixture: ComponentFixture<AutomatizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomatizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomatizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
