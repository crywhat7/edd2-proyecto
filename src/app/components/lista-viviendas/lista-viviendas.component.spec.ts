import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaViviendasComponent } from './lista-viviendas.component';

describe('ListaViviendasComponent', () => {
  let component: ListaViviendasComponent;
  let fixture: ComponentFixture<ListaViviendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaViviendasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaViviendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
