import { AVAILABLE_POWERS, CATEGORIES, GENDERS } from './../../utils/data';
import { Component, Input } from '@angular/core';
import { InputComponent } from '../input/input';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../button/button';
import { Select } from '../select/select';

@Component({
  selector: 'app-form-hero',
  imports: [InputComponent, ReactiveFormsModule, Button, Select],
  templateUrl: './form-hero.html',
  styleUrl: './form-hero.scss',
})
export class FormHero {
  @Input() title: string = '';
  categories = CATEGORIES;
  availablePowers = AVAILABLE_POWERS;
  genders = GENDERS;
  heroForm = new FormGroup({
    id: new FormControl(uuidv4()),
    name: new FormControl('', [Validators.required]),
    history: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    isActive: new FormControl(true),
    powers: new FormArray(AVAILABLE_POWERS.map(() => new FormControl(false))),
    stats: new FormGroup({
      strength: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      intelligence: new FormControl(null, [
        Validators.min(0),
        Validators.max(100),
      ]),
      speed: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      durability: new FormControl(null, [
        Validators.min(0),
        Validators.max(100),
      ]),
      energyProjection: new FormControl(null, [
        Validators.min(0),
        Validators.max(100),
      ]),
      combatSkill: new FormControl(null, [
        Validators.min(0),
        Validators.max(100),
      ]),
    }),
  });

  get powersArray(): FormArray {
    return this.heroForm.get('powers') as FormArray;
  }

  getPowersControl(index: number): FormControl {
    return this.powersArray.controls[index] as FormControl;
  }

  getControl(path: string): FormControl {
    return this.heroForm.get(path) as FormControl;
  }

  saveHeroe() {
    console.log(this.heroForm.value);
  }

  onImageSelected(event: Event) {
    console.log('event', event);
  }
}
