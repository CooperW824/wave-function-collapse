import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveFunctionOutputComponent } from './wave-function-output.component';

describe('WaveFunctionOutputComponent', () => {
  let component: WaveFunctionOutputComponent;
  let fixture: ComponentFixture<WaveFunctionOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaveFunctionOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaveFunctionOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
