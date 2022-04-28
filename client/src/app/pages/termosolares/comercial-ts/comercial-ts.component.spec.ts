import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercialTsComponent } from './comercial-ts.component';

describe('ComercialTsComponent', () => {
  let component: ComercialTsComponent;
  let fixture: ComponentFixture<ComercialTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComercialTsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComercialTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
