import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencialTsComponent } from './residencial-ts.component';

describe('ResidencialTsComponent', () => {
  let component: ResidencialTsComponent;
  let fixture: ComponentFixture<ResidencialTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencialTsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidencialTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
