import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyManagement } from './baby-management';

describe('BabyManagement', () => {
  let component: BabyManagement;
  let fixture: ComponentFixture<BabyManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BabyManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(BabyManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
