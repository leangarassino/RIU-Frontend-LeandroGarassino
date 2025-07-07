import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHero } from './form-hero';

describe('FormHero', () => {
  let component: FormHero;
  let fixture: ComponentFixture<FormHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
