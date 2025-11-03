import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPruebaComponent } from './crud-prueba.component';

describe('CrudPruebaComponent', () => {
  let component: CrudPruebaComponent;
  let fixture: ComponentFixture<CrudPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudPruebaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
