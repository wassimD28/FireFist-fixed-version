import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyDiagramComponent } from './body-diagram.component';

describe('BodyDiagramComponent', () => {
  let component: BodyDiagramComponent;
  let fixture: ComponentFixture<BodyDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyDiagramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
