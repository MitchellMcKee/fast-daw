import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DawTrackComponent } from './daw-track.component';

describe('DawTrackComponent', () => {
  let component: DawTrackComponent;
  let fixture: ComponentFixture<DawTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DawTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DawTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
