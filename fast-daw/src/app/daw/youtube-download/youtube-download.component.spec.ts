import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeDownloadComponent } from './youtube-download.component';

describe('YoutubeDownloadComponent', () => {
  let component: YoutubeDownloadComponent;
  let fixture: ComponentFixture<YoutubeDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
