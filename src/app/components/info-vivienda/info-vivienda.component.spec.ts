import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoViviendaComponent } from './info-vivienda.component';

describe('InfoViviendaComponent', () => {
  let component: InfoViviendaComponent;
  let fixture: ComponentFixture<InfoViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoViviendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
