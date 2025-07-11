import { AVAILABLE_POWERS, CATEGORIES, GENDERS } from './../../utils/data';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { Image } from '../image/image';
import { IHero } from '../../models/Hero.model';
import { Link } from '../link/link';

@Component({
  selector: 'app-form-hero',
  imports: [InputComponent, ReactiveFormsModule, Button, Select, Image, Link],
  templateUrl: './form-hero.html',
  styleUrl: './form-hero.scss',
})
export class FormHero {
  @Input() title: string = '';
  @Input() textButton: string = '';
  @Input() set hero(hero: IHero | null) {
    if (hero) {
      this.editHero = hero;
      this.patchFormWithHero(hero);
    }
  }
  @Output() emitHeroe: EventEmitter<IHero> = new EventEmitter();
  categories = CATEGORIES;
  availablePowers = AVAILABLE_POWERS;
  genders = GENDERS;
  loading = false;
  editHero: IHero | null = null;
  heroForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    history: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(200),
    ]),
    category: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    isRetired: new FormControl(false),
    powers: new FormArray(AVAILABLE_POWERS.map(() => new FormControl(false))),
    stats: new FormGroup({
      strength: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      intelligence: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      speed: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      durability: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      defense: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      combatSkill: new FormControl(0, [
        Validators.required,
        Validators.min(1),
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

  sendHeroe() {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formValue = this.heroForm.value;
    const statsGroup = this.heroForm.get('stats') as FormGroup;
    const hero: IHero = {
      id: this.editHero?.id as string,
      name: formValue.name as string,
      history: formValue.history as string,
      category: formValue.category as string,
      gender: formValue.gender as string,
      image: formValue.image as string,
      isRetired: formValue.isRetired as boolean,
      powers: this.powersArray.value ?? [],
      stats: {
        strength: statsGroup.get('strength')?.value as number,
        intelligence: statsGroup.get('intelligence')?.value as number,
        speed: statsGroup.get('speed')?.value as number,
        durability: statsGroup.get('durability')?.value as number,
        defense: statsGroup.get('defense')?.value as number,
        combatSkill: statsGroup.get('combatSkill')?.value as number,
      },
    };
    this.emitHeroe.emit(hero);
    this.heroForm.reset();
    this.loading = false;
  }

  onImageSelected(event: string) {
    this.heroForm.patchValue({ image: event });
  }

  private patchFormWithHero(hero: IHero): void {
    this.heroForm.patchValue({
      name: hero.name,
      history: hero.history,
      category: hero.category,
      gender: hero.gender,
      isRetired: hero.isRetired,
      powers: hero.powers,
      stats: {
        strength: Number(hero.stats.strength),
        intelligence: Number(hero.stats.intelligence),
        speed: Number(hero.stats.speed),
        durability: Number(hero.stats.durability),
        defense: Number(hero.stats.defense),
        combatSkill: Number(hero.stats.combatSkill),
      },
      image: hero.image,
    });
  }
}
