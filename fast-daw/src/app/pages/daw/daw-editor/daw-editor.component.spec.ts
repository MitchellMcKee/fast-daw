import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DawEditorComponent } from './daw-editor.component';

describe('DawEditorComponent', () => {
  let component: DawEditorComponent;
  let fixture: ComponentFixture<DawEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DawEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DawEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
