import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyItem } from './baby-item';

describe('BabyItem', () => {
  let component: BabyItem;
  let fixture: ComponentFixture<BabyItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BabyItem],
    }).compileComponents();

    fixture = TestBed.createComponent(BabyItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
