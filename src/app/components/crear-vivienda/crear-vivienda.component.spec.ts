import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearViviendaComponent } from './crear-vivienda.component';

describe('CrearViviendaComponent', () => {
  let component: CrearViviendaComponent;
  let fixture: ComponentFixture<CrearViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearViviendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
