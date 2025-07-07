import { Component } from '@angular/core';
import { FormHero } from '../../components/form-hero/form-hero';

@Component({
  selector: 'app-create',
  imports: [FormHero],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {}
