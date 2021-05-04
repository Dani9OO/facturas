import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketDetailsRoutingModule } from './ticket-details-routing.module';
import { TicketDetailsComponent } from './ticket-details.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ScannerComponent } from './scanner/scanner.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ScannerDialogComponent } from './scanner-dialog/scanner-dialog.component';

@NgModule({
  declarations: [
    TicketDetailsComponent,
    ScannerComponent,
    DataTableComponent,
    ScannerDialogComponent
  ],
  imports: [
    CommonModule,
    TicketDetailsRoutingModule,
    ZXingScannerModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class TicketDetailsModule { }
