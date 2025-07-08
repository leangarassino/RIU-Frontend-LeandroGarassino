import { Pipe, PipeTransform } from '@angular/core';
import { TRANSLATIONS } from '../utils/data';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  transform(key: string): string {
    return TRANSLATIONS[key] || key;
  }
}
