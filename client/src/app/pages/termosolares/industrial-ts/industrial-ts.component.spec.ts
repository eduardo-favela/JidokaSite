import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialTsComponent } from './industrial-ts.component';

describe('IndustrialTsComponent', () => {
  let component: IndustrialTsComponent;
  let fixture: ComponentFixture<IndustrialTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrialTsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrialTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
