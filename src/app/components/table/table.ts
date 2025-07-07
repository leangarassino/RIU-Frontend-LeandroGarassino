import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Button } from '../button/button';

export type TableCell = string | number | boolean | null;

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, CommonModule, Button],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table implements AfterViewInit {
  dataSource: MatTableDataSource<Record<string, TableCell>> =
    new MatTableDataSource<Record<string, TableCell>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() set data(data: Record<string, TableCell>[]) {
    this.dataSource.data = data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @Input() displayedColumns!: string[];

  onEdit(row: Record<string, TableCell>) {
    console.log('Editar:', row);
    // abrir modal, formulario, etc.
  }

  onDelete(row: Record<string, TableCell>) {
    console.log('Eliminar:', row);
    // mostrar confirmación, eliminar del array, etc.
  }
}
