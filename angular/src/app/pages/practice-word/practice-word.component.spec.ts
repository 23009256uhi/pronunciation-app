import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeWordComponent } from './practice-word.component';

describe('PracticeWordComponent', () => {
  let component: PracticeWordComponent;
  let fixture: ComponentFixture<PracticeWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeWordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
