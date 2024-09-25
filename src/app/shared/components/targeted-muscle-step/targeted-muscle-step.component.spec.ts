import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetedMuscleStepComponent } from './targeted-muscle-step.component';

describe('TargetedMuscleStepComponent', () => {
  let component: TargetedMuscleStepComponent;
  let fixture: ComponentFixture<TargetedMuscleStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetedMuscleStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetedMuscleStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
