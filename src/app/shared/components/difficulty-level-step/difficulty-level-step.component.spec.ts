import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyLevelStepComponent } from './difficulty-level-step.component';

describe('DifficultyLevelStepComponent', () => {
  let component: DifficultyLevelStepComponent;
  let fixture: ComponentFixture<DifficultyLevelStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifficultyLevelStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DifficultyLevelStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
