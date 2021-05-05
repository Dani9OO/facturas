import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../_services/data.service';

@Component({
  templateUrl: './scanner-dialog.component.html',
  styleUrls: ['./scanner-dialog.component.scss']
})
export class ScannerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ScannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dataService: DataService
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

  async handleScan(evt: string) {
    const scan = evt.split('/');
    const guías = scan[3].split('|');
    this.scannerEnabled = false;
    let updated;
    try {
      updated = await this.dataService.validarFactura(this.data.id, guías);
    } catch (error) {
      console.error(error);
    }
    this.dialogRef.close(updated);
  }

}
