import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyForm } from './baby-form';

describe('BabyForm', () => {
  let component: BabyForm;
  let fixture: ComponentFixture<BabyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BabyForm],
    }).compileComponents();

    fixture = TestBed.createComponent(BabyForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
