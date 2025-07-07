import { Component } from '@angular/core';
import { Table } from '../../components/table/table';
import { Link } from '../../components/link/link';
@Component({
  selector: 'app-heroes',
  imports: [Table, Link],
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
})
export class Heroes {
  dataSource = [];
  colums = ['position', 'name', 'weight', 'symbol', 'actions'];
}
