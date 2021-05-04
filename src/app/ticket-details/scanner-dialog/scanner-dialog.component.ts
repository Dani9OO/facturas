import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../_services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './scanner-dialog.component.html',
  styleUrls: ['./scanner-dialog.component.scss']
})
export class ScannerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ScannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public scannedString = '';
  public scannerEnabled = false;

  boton(evt: MouseEvent) {
    this.scannerEnabled = true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  async handleScan(evt: string) {
    const scan = evt.split('/');
    const guías = scan[3].split('|');
    this.scannerEnabled = false;
    let uploaded;
    try {
      uploaded = await this.dataService.validarFactura(this.data.id, guías);
    } catch (error) {
      console.error(error);
    }
    if (uploaded instanceof Error) this.openSnackBar(uploaded.message, 'Error');
    if (typeof uploaded === 'string') this.openSnackBar(uploaded, '✓');
    this.scannedString = evt;
  }

}
