import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleToolTipComponent } from './muscle-tool-tip.component';

describe('MuscleToolTipComponent', () => {
  let component: MuscleToolTipComponent;
  let fixture: ComponentFixture<MuscleToolTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleToolTipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuscleToolTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
