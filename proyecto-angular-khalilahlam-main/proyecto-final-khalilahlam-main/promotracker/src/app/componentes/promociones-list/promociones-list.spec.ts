import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionesList } from './promociones-list';

describe('PromocionesList', () => {
  let component: PromocionesList;
  let fixture: ComponentFixture<PromocionesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocionesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
