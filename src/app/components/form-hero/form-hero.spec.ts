import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormHero } from './form-hero';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';
import { IHero } from '../../models/Hero.model';
import { v4 as uuidv4 } from 'uuid';

export const AVAILABLE_POWERS = [
  'Vuelo',
  'Superfuerza',
  'Velocidad',
  'Invisibilidad',
  'Rayos láser',
  'Telequinesis',
  'Manipulación del tiempo',
  'Regeneración',
  'Control mental',
  'Inmortalidad',
  'Tecnopatía',
];

const VALID_HERO_FORM_DATA = {
  name: 'Valid Hero Name',
  history:
    'This is a valid hero history that meets the minimum length requirements.',
  category: 'Mutante',
  gender: 'Masculino',
  image:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
  isRetired: false,
  powers: [true, false, true, false, false],
  stats: {
    strength: 50,
    intelligence: 60,
    speed: 70,
    durability: 80,
    defense: 90,
    combatSkill: 100,
  },
};

const VALID_IHERO_DATA: IHero = {
  id: uuidv4(),
  name: 'Superman',
  history:
    'This is a valid hero history that meets the minimum length requirements.',
  category: 'Galáctico',
  gender: 'Masculino',
  image:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
  isRetired: false,
  powers: [
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
  ],
  stats: {
    strength: 50,
    intelligence: 60,
    speed: 70,
    durability: 80,
    defense: 90,
    combatSkill: 100,
  },
};

describe('FormHeroComponent', () => {
  let component: FormHero;
  let fixture: ComponentFixture<FormHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHero, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormHero);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize heroForm with all controls', () => {
    fixture.detectChanges();

    expect(component.heroForm).toBeInstanceOf(FormGroup);
    expect(component.heroForm.get('name')).toBeInstanceOf(FormControl);
    expect(component.heroForm.get('history')).toBeInstanceOf(FormControl);
    expect(component.heroForm.get('category')).toBeInstanceOf(FormControl);
    expect(component.heroForm.get('gender')).toBeInstanceOf(FormControl);
    expect(component.heroForm.get('image')).toBeInstanceOf(FormControl);
    expect(component.heroForm.get('isRetired')).toBeInstanceOf(FormControl);
    expect(component.heroForm.get('powers')).toBeInstanceOf(FormArray);
    expect(component.heroForm.get('stats')).toBeInstanceOf(FormGroup);
    expect(component.powersArray.length).toBe(AVAILABLE_POWERS.length);

    const statsGroup = component.heroForm.get('stats') as FormGroup;
    expect(statsGroup.get('strength')).toBeInstanceOf(FormControl);
    expect(statsGroup.get('intelligence')).toBeInstanceOf(FormControl);
  });

  it('should make the form invalid when empty', () => {
    fixture.detectChanges();
    expect(component.heroForm.valid).toBeFalse();
  });

  it('should make the form valid when all required fields are filled correctly', () => {
    fixture.detectChanges();
    component.heroForm.patchValue(VALID_HERO_FORM_DATA);
    expect(component.heroForm.valid).toBeTrue();
  });

  it('sendHeroe() should mark all controls as touched and not emit if form is invalid', () => {
    fixture.detectChanges();

    const emitSpy = spyOn(component.emitHeroe, 'emit');
    const markAllAsTouchedSpy = spyOn(component.heroForm, 'markAllAsTouched');

    component.sendHeroe();

    expect(markAllAsTouchedSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('sendHeroe() should emit the hero and reset the form if valid', () => {
    fixture.detectChanges();
    component.heroForm.patchValue(VALID_HERO_FORM_DATA);

    const emitSpy = spyOn(component.emitHeroe, 'emit');
    const resetSpy = spyOn(component.heroForm, 'reset');
    component.sendHeroe();

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(resetSpy).toHaveBeenCalledTimes(1);
    expect(component.loading).toBeFalse();
  });

  it('patchFormWithHero() should correctly patch the form with hero data', () => {
    fixture.detectChanges();

    const heroForEditing: IHero = VALID_IHERO_DATA;
    (component as any).patchFormWithHero(heroForEditing);

    expect(component.heroForm.get('name')?.value).toBe(heroForEditing.name);
    expect(component.heroForm.get('history')?.value).toBe(
      heroForEditing.history,
    );
    expect(component.heroForm.get('category')?.value).toBe(
      heroForEditing.category,
    );
    expect(component.heroForm.get('gender')?.value).toBe(heroForEditing.gender);
    expect(component.heroForm.get('image')?.value).toBe(heroForEditing.image);
    expect(component.heroForm.get('isRetired')?.value).toBe(
      heroForEditing.isRetired,
    );
    expect(component.heroForm.get('powers')?.value).toEqual(
      heroForEditing.powers,
    );
    expect(component.heroForm.get('stats')?.value).toEqual(
      heroForEditing.stats,
    );
  });

  it('onImageSelected() should patch the image control value', () => {
    const testImageUrl = 'data:image/png;base64,mockBase64StringFromEvent';
    component.onImageSelected(testImageUrl);
    expect(component.heroForm.get('image')?.value).toBe(testImageUrl);
  });
});
