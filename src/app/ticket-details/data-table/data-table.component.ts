import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Factura } from '../../common.interfaces';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ScannerDialogComponent } from '../scanner-dialog/scanner-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {

  displayedColumns: string[] = ['remision', 'acciones'];
  dataSource = new MatTableDataSource<Factura>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  @ViewChild(MatSort) sort: MatSort | null;

  guia = new FormControl();
  input = new FormControl();

  constructor(
    private data: DataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.paginator = this.dataSource.paginator;
    this.sort = this.dataSource.sort;
  }

  ngOnInit(): void {
    this.data.facturas$.subscribe(x => {
      this.dataSource.data = x;
      this.paginator = this.dataSource.paginator;
      this.sort = this.dataSource.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  asignarFactura(id: string, guia: string) {
    console.log('id', id);
    console.log('guía', guia);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  validarGuias(id: string) {
    const dialogRef = this.dialog.open(ScannerDialogComponent, {
      width: '80%',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.openSnackBar(result, '✓');
    })
  }

}
