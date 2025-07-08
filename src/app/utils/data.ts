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

export enum Category {
  Cosmic = 'Cósmico',
  Mutant = 'Mutante',
  Tech = 'Tecnológico',
  Magic = 'Mágico',
  Alien = 'Alienígena',
  Human = 'Humano',
}

export enum Gender {
  Male = 'Masculino',
  Female = 'Femenino',
  NonBinary = 'No binario',
  Other = 'Otro',
}

export const CATEGORIES = [
  { value: Category.Cosmic, label: 'Cósmico' },
  { value: Category.Mutant, label: 'Mutante' },
  { value: Category.Tech, label: 'Tecnológico' },
  { value: Category.Magic, label: 'Mágico' },
  { value: Category.Alien, label: 'Alienígena' },
  { value: Category.Human, label: 'Humano' },
];

export const GENDERS = [
  { value: Gender.Male, label: 'Masculino' },
  { value: Gender.Female, label: 'Femenino' },
  { value: Gender.NonBinary, label: 'No binario' },
  { value: Gender.Other, label: 'Otro' },
];

export const TRANSLATIONS: { [key: string]: string } = {
  name: 'Nombre',
  category: 'Categoría',
  gender: 'Género',
  isRetired: 'Retirado',
  true: 'Sí',
  false: 'No',
};
