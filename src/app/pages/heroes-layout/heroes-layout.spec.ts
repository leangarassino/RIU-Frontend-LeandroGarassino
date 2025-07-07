import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesLayout } from './heroes-layout';

describe('HeroesLayout', () => {
  let component: HeroesLayout;
  let fixture: ComponentFixture<HeroesLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
