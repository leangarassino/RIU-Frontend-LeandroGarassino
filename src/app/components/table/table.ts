import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Button } from '../button/button';
import { TranslatePipe } from '../../pipes/translate-pipe';

export type TableCell = string | number | boolean | null;

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    Button,
    TranslatePipe,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  standalone: true,
})
export class Table implements AfterViewInit {
  dataSource: MatTableDataSource<Record<string, TableCell>> =
    new MatTableDataSource<Record<string, TableCell>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() edit: EventEmitter<Record<string, TableCell>> = new EventEmitter();
  @Output() delete: EventEmitter<Record<string, TableCell>> =
    new EventEmitter();
  @Output() showHero: EventEmitter<Record<string, TableCell>> =
    new EventEmitter();
  @Input() set data(data: Record<string, TableCell>[]) {
    this.dataSource.data = data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @Input() displayedColumns!: string[];

  onEdit(row: Record<string, TableCell>) {
    this.edit.emit(row);
  }

  onDelete(row: Record<string, TableCell>) {
    this.delete.emit(row);
  }

  show(row: Record<string, TableCell>) {
    this.showHero.emit(row);
  }
}
